import LanguageSwitcher from "./LanguageSwitcher";
import type { Language } from "@/App";

interface HeaderProps {
  language: Language;
  onLanguageChange: (language: Language) => void;
}

export default function Header({ language, onLanguageChange }: HeaderProps) {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 glass-header header-gradient-bg animate-fade-in-down"
    >
      <div className="container mx-auto px-4 sm:px-6 py-4 flex items-center justify-between header-surface">
        <div className="flex items-center gap-3 animate-fade-in-up-small">
          <picture>
            <source srcSet="/fox-logo-64.webp" type="image/webp" />
            <img
              src="/fox-logo.png"
              alt="FoxYvn Logo"
              className="w-8 h-8 sm:w-10 sm:h-10 header-logo-glow"
              width="40"
              height="40"
              loading="eager"
              decoding="async"
            />
          </picture>
          <div className="text-lg sm:text-xl font-bold header-title-shadow">
            <span className="text-[#df4e10]">
              FOX
            </span>
            <span className="text-muted-foreground">YVN</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <LanguageSwitcher
            language={language}
            onLanguageChange={onLanguageChange}
          />
        </div>
      </div>
    </header>
  );
}
