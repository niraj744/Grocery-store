import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Pages/Layout";
import SignInPage from "./Pages/SignIn";
import SignUpPage from "./Pages/SignUp";
import Home from "./Pages/Home";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import CategoriesPage from "./Pages/CategoriesPage";

const client = new QueryClient();

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { index: "/", element: <Home /> },
      { path: "/sign-in", element: <SignInPage /> },
      { path: "/sign-up/*", element: <SignUpPage /> },
      { path: "category/:id", element: <CategoriesPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={client}>
    <RouterProvider router={router} />
  </QueryClientProvider>
);
