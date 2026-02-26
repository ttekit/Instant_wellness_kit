import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
// @ts-expect-error не чіпайте а то всьо полетить
import "./index.css";
// @ts-expect-error не чіпайте а то всьо полетить
import './client/assets/client.css' 
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);