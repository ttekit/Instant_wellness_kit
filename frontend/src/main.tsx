import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";

import "./client/assets/client.css";

// import App from "./App";
import Admin from "./admin/Admin";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Admin />
    </BrowserRouter>
  </StrictMode>,
);
