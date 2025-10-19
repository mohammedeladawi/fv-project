import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProjectsLayout = () => {
  const { logout } = useContext(AuthContext);
  return (
    <>
      <header>
        <button onClick={logout}>Logout</button>
      </header>
      <Outlet />
    </>
  );
};

export default ProjectsLayout;
