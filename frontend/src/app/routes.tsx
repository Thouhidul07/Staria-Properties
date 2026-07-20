import { createBrowserRouter } from "react-router";
import Layout from "./Layout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import DevelopmentPage from "./pages/DevelopmentPage";
import PropertiesPage from "./pages/PropertiesPage";
import InteriorPage from "./pages/InteriorPage";
import ProjectsPage from "./pages/ProjectsPage";
import NewsPage from "./pages/NewsPage";
import ContactPage from "./pages/ContactPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: "about", Component: AboutPage },
      { path: "development", Component: DevelopmentPage },
      { path: "properties", Component: PropertiesPage },
      { path: "interior", Component: InteriorPage },
      { path: "projects", Component: ProjectsPage },
      { path: "news", Component: NewsPage },
      { path: "contact", Component: ContactPage },
    ],
  },
]);
