import { cn } from "@/lib/utils";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";
import { Component, ReactNode, type ErrorInfo } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Track error in analytics (only safe data, no stack trace)
    if (typeof window !== "undefined" && window.umami) {
      window.umami.track("error", {
        name: error.name,
        message: error.message,
        page: window.location.pathname,
      });
    }

    // Log full error in development only
    if (import.meta.env.DEV) {
      console.error("Error caught by boundary:", error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-screen p-4 sm:p-8 bg-background">
          <div
            className="flex flex-col items-center w-full max-w-2xl p-6 sm:p-8 animate-fade-in-scale"
          >
            <div>
              <AlertTriangle
                size={48}
                className="text-primary mb-6 flex-shrink-0"
              />
            </div>

            <h2 className="text-xl sm:text-2xl font-bold mb-2 text-center">
              Что-то пошло не так
            </h2>

            <p className="text-sm sm:text-base text-muted-foreground mb-6 text-center">
              Произошла непредвиденная ошибка. Попробуйте перезагрузить страницу.
            </p>

            {import.meta.env.DEV && this.state.error && (
              <div
                className="p-4 w-full rounded-xl bg-muted overflow-auto mb-6 max-h-60"
              >
                <pre className="text-xs sm:text-sm text-muted-foreground whitespace-pre-wrap break-words">
                  {this.state.error?.stack}
                </pre>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <button
                onClick={() => window.location.reload()}
                className={cn(
                  "flex items-center justify-center gap-2 px-6 py-4 rounded-xl min-h-[44px]",
                  "glass-button text-white font-medium hover-scale",
                  "cursor-pointer"
                )}
              >
                <RotateCcw size={20} />
                Перезагрузить
              </button>

              <a
                href="/"
                className={cn(
                  "flex items-center justify-center gap-2 px-6 py-4 rounded-xl min-h-[44px]",
                  "bg-secondary text-secondary-foreground font-medium hover-scale",
                  "cursor-pointer"
                )}
              >
                <Home size={20} />
                На главную
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
