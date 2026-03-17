import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { HelmetProvider } from "react-helmet-async";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <div className="selection:bg-red-100 selection:text-red-900 selection:bg-opacity-70">
        <App />
      </div>
    </HelmetProvider>
  </StrictMode>,
);
