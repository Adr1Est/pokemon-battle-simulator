import { createBrowserRouter } from "react-router";
import App from "@/App";
import TeamsPage from "@/pages/TeamsPage";
import NotFoundPage from "@/pages/NotFoundPage";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { index: true, Component: TeamsPage },
      { path: "*", Component: NotFoundPage },
    ],
  },
]);

export default router;