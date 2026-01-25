/// <reference types="vite/client" />

interface UmamiTracker {
  track: (event: string, payload?: Record<string, unknown>) => void;
}

interface Window {
  umami?: UmamiTracker;
}
