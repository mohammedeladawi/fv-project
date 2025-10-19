import React from "react";
import { AuthProvider } from "./AuthContext";
import { ProjectsProvider } from "./ProjectsContext";

const ContextProvider = ({ children }) => {
  return (
    <AuthProvider>
      <ProjectsProvider>{children}</ProjectsProvider>
    </AuthProvider>
  );
};

export default ContextProvider;
