import { createContext, useContext, useMemo, useState } from "react";
import api from "../api/axiosConfig";
import { AuthContext } from "./AuthContext";

export const ProjectsContext = createContext();

export const ProjectsProvider = ({ children }) => {
  const { accessToken, logout, restoreTokens } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const [totalProjects, setTotalProjects] = useState(0);

  const fetchProjects = async (skip = 0, limit = 3) => {
    restoreTokens();
    try {
      const response = await api.get("/project", {
        params: { total: true, skip, limit },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const projectsList = response.data.data;
      const totalProjectsCount = response.data.totalRecords;

      setProjects(projectsList);
      setTotalProjects(totalProjectsCount);
    } catch (err) {
      console.error(err.response?.data?.message || "Failed to fetch projects");
      logout();
    }
  };

  const fetchProjectDetails = async (id) => {
    restoreTokens();

    try {
      const response = await api.get(`/project/${id}`);
      return response.data.data;
    } catch (err) {
      console.error("Error fetching project:", err);
      logout();
      return null;
    }
  };

  return (
    <ProjectsContext.Provider
      value={{ projects, fetchProjects, totalProjects, fetchProjectDetails }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};
