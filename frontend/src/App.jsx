import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useSelector } from "react-redux";

import Home from "./components/Home";
import Login from "./components/dashboard/login";
import ProfileUpdate from "./components/dashboard/profileUpdate";
import UpdateProject from "./components/dashboard/updateProject";
import ProtectedRoute from "./components/dashboard/protectedRoute";
import DashboardHome from "./components/dashboard/DashboardHome";
import EditProjects from "./components/dashboard/EditProjects";
import EditProject from "./components/dashboard/EditProject";

const appRouter = createBrowserRouter(
  [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/dashboard",
      element: (
        <ProtectedRoute>
          <DashboardHome />
        </ProtectedRoute>
      ),
    },
    {
      path: "/dashboard/herosection",
      element: (
        <ProtectedRoute>
          <ProfileUpdate />
        </ProtectedRoute>
      ),
    },
    {
      path: "/dashboard/project",
      element: (
        <ProtectedRoute>
          <UpdateProject />
        </ProtectedRoute>
      ),
    },
    {
      path: "/dashboard/editprojects",
      element: (
        <ProtectedRoute>
          <EditProjects />
        </ProtectedRoute>
      ),
    },
    {
      path: "/dashboard/editprojects/:id",
      element: (
        <ProtectedRoute>
          <EditProject />
        </ProtectedRoute>
      ),
    },
  ],
  {
    future: {
      v7_startTransition: true, // Opt-in to React Router's future features
    },
  }
);

function App() {
  const { theam } = useSelector((store) => store.application);

  return (
    <div
      className={`${
        theam
          ? "transition-all duration-300 bg-[url('./hd.jpg')]"
          : "transition-all duration-300 bg-[url('./w3.jpg')]"
      } bg-cover bg-center h-screen bg-fixed overflow-x-hidden`}
    >
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;
