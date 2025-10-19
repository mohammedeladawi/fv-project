import { createContext, useState } from "react";
import api from "../api/axiosConfig";

export const ProjectsContext = createContext();

export const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    try {
      const response = await api.get("/project?total=true");
      const projectsList = response.data.data;
      //   console.log(projectsList);
      setProjects(projectsList);
    } catch (err) {
      console.error(err.response?.data?.message || "Failed to fetch projects");
    }
  };

  return (
    <ProjectsContext.Provider value={{ projects, fetchProjects }}>
      {children}
    </ProjectsContext.Provider>
  );
};
