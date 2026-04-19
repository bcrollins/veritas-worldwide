import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, useLocation } from "react-router-dom";
import { AuthProvider } from "./lib/AuthContext";
import { ThemeProvider } from "./lib/ThemeContext";
import App from "./App";
import "./styles/index.css";

function preserveBrandHeading(targetTag: "h1" | "p") {
  const brandLink = document.querySelector('a[aria-label="Veritas Worldwide — Home"]');
  const currentHeading = brandLink?.querySelector("h1, p");

  if (!(currentHeading instanceof HTMLElement)) return;
  if (currentHeading.tagName.toLowerCase() === targetTag) return;
  if (currentHeading.textContent?.trim() !== "Veritas Worldwide") return;

  const replacement = document.createElement(targetTag);
  replacement.className = currentHeading.className;
  replacement.textContent = currentHeading.textContent ?? "";
  currentHeading.replaceWith(replacement);
}

function HeadingOwnershipGuard() {
  const location = useLocation();

  useEffect(() => {
    const targetTag = location.pathname === "/" ? "h1" : "p";
    let frameId = 0;

    const applyHeadingOwnership = () => {
      preserveBrandHeading(targetTag);
    };

    const scheduleApply = () => {
      cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(applyHeadingOwnership);
    };

    scheduleApply();

    const observer = new MutationObserver(() => {
      applyHeadingOwnership();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(frameId);
      observer.disconnect();
    };
  }, [location.pathname]);

  return null;
}

const root = document.getElementById("root");

if (!root) {
  throw new Error("Root element not found");
}

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <BrowserRouter>
      <HeadingOwnershipGuard />
      <ThemeProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
