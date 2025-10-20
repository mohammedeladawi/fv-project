import { Navigate, Route, Routes, useRoutes } from "react-router-dom";
import Login from "./pages/Login";
import ProjectsList from "./pages/ProjectsList/ProjectsList";
import ProjectDetails from "./pages/ProjectDetails";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import ProjectsLayout from "./layouts/ProjectsLayout";

const PrivateRoute = ({ children }) => {
  const { accessToken } = useContext(AuthContext);
  return accessToken ? children : <Navigate to="/login" replace />;
};

const PublicRoute = ({ children }) => {
  const { accessToken } = useContext(AuthContext);
  return accessToken ? <Navigate to="/projects" replace /> : children;
};

function App() {
  const routes = [
    {
      path: "/login",
      element: (
        <PublicRoute>
          <Login />
        </PublicRoute>
      ),
    },
    {
      path: "/projects",
      element: (
        <PrivateRoute>
          <ProjectsLayout />
        </PrivateRoute>
      ),
      children: [
        { index: true, element: <ProjectsList /> }, // /projects
        { path: ":id", element: <ProjectDetails /> }, // /projects/:id
      ],
    },

    {
      path: "*",
      element: <Navigate to="/login" replace />,
    },
  ];

  return useRoutes(routes);
}

export default App;
