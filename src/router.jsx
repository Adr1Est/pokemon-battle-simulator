import { createBrowserRouter } from "react-router";
import App from "@/App";
import CreateTeamPage from "@/pages/CreateTeamPage";
import NotFoundPage from "@/pages/NotFoundPage";
import TeamsPage from "@/pages/TeamsPage";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { index: true, Component: CreateTeamPage },
      { path: "teams", Component: TeamsPage },
      { path: "*", Component: NotFoundPage },
    ],
  },
]);

export default router;