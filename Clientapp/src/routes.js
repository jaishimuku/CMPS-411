import Layout from "./Layout";
import DashboardAdmin from "./components/Dashboard/DashboardAdmin";

const routes = [
  {
    path: "admin",
    element: <Layout />,
    children: [
      { path: "/", element: <Login /> },
      { path: "login", element: <Login /> },
      { path: "dashboardadmin", element: <DashboardAdmin /> },
      { path: "dashboardTa", element: <DashboardTa /> },
    ],
  },
  {
    path: "admin",
    element: <Layout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "dashboardadmin", element: <DashboardAdmin /> },
      { path: "dashboardTa", element: <DashboardTa /> },
    ],
  },
];

export default routes;
