import { createBrowserRouter } from "react-router";
import Layout from "./Layout";
import HomePage from "./pages/HomePage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: "about", lazy: async () => ({ Component: (await import("./pages/AboutPage")).default }) },
      { path: "development", lazy: async () => ({ Component: (await import("./pages/DevelopmentPage")).default }) },
      { path: "properties", lazy: async () => ({ Component: (await import("./pages/PropertiesPage")).default }) },
      { path: "properties/:id", lazy: async () => ({ Component: (await import("./pages/PropertiesPage")).default }) },
      { path: "interior", lazy: async () => ({ Component: (await import("./pages/InteriorPage")).default }) },
      { path: "projects", lazy: async () => ({ Component: (await import("./pages/ProjectsPage")).default }) },
      { path: "projects/:id", lazy: async () => ({ Component: (await import("./pages/ProjectsPage")).default }) },
      { path: "news", lazy: async () => ({ Component: (await import("./pages/NewsPage")).default }) },
      { path: "news/:id", lazy: async () => ({ Component: (await import("./pages/NewsPage")).default }) },
      { path: "contact", lazy: async () => ({ Component: (await import("./pages/ContactPage")).default }) },
      { path: "*", Component: HomePage },
    ],
  },
  { path: "/admin/login", lazy: async () => ({ Component: (await import("./admin/AdminLoginPage")).default }) },
  {
    path: "/admin",
    lazy: async () => ({ Component: (await import("./admin/AdminAuth")).AdminAuthProvider }),
    children: [
      {
        lazy: async () => ({ Component: (await import("./admin/AdminAuth")).RequireAdmin }),
        children: [
          {
            lazy: async () => ({ Component: (await import("./admin/AdminLayout")).default }),
            children: [
              { index: true, lazy: async () => ({ Component: (await import("./admin/AdminDashboardPage")).default }) },
              { path: "content/:resource", lazy: async () => ({ Component: (await import("./admin/AdminResourcePage")).default }) },
              { path: "enquiries", lazy: async () => ({ Component: (await import("./admin/AdminEnquiriesPage")).default }) }
            ]
          }
        ]
      }
    ]
  }
]);
