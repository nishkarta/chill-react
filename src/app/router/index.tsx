import { createBrowserRouter, redirect } from "react-router-dom";
import App from "../App";
import { loginRoutes } from "@features/login/login.routes";
import { registerRoutes } from "@features/register/register.routes";
import { homeRoutes } from "@features/home/home.routes";

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, loader: () => redirect("/login") },
      ...loginRoutes,
      ...registerRoutes,
      ...homeRoutes
    ]
  }
])