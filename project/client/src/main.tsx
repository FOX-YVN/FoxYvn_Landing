import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "./animations.css";
import { initAnalytics } from "./utils/analytics";

// Initialize analytics if configured
initAnalytics();

createRoot(document.getElementById("root")!).render(<App />);
