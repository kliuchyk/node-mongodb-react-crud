import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Record, RecordsList } from "./components";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true, // Equivalent to path: "/"
        element: <RecordsList />,
      },
      {
        path: "edit/:id",
        element: <Record />,
      },
      {
        path: "create",
        element: <Record />,
      },
    ],
  },
]);

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
} else {
  console.error(
    "❌ Root element not found! Make sure there is a <div id='root'></div> in index.html."
  );
}
