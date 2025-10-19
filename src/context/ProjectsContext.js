import { createContext, useState } from "react";
import api from "../api/axiosConfig";

export const ProjectsContext = createContext();

export const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [totalProjects, setTotalProjects] = useState(0);

  const fetchProjects = async (skip = 0, limit = 3) => {
    try {
      const response = await api.get(
        `/project?total=true&skip=${skip}&limit=${limit}`
      );
      const projectsList = response.data.data;
      const totalProjectsCount = response.data.totalRecords;

      setProjects(projectsList);
      setTotalProjects(totalProjectsCount);
    } catch (err) {
      console.error(err.response?.data?.message || "Failed to fetch projects");
    }
  };

  return (
    <ProjectsContext.Provider
      value={{ projects, fetchProjects, totalProjects }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};
