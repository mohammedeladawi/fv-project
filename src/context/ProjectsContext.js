import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import api from "../api/axiosConfig";
import { AuthContext } from "./AuthContext";

export const ProjectsContext = createContext();

export const ProjectsProvider = ({ children }) => {
  const { logout, restoreTokens } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const [totalProjects, setTotalProjects] = useState(0);

  const fetchProjects = useCallback(async (skip = 0, limit = 3) => {
    restoreTokens();
    try {
      const response = await api.get("/project", {
        params: { total: true, skip, limit },
      });
      const projectsList = response.data.data;
      const totalProjectsCount = response.data.totalRecords;

      setProjects(projectsList);
      setTotalProjects(totalProjectsCount);
    } catch (err) {
      console.error("Failed to fetch projects");
      logout();
    }
  }, []);

  const fetchProjectDetails = useCallback(
    async (id) => {
      restoreTokens();

      try {
        const response = await api.get(`/project/${id}`);
        return response.data.data;
      } catch (err) {
        console.error("Error fetching project:", err);
        logout();
        return null;
      }
    },
    [restoreTokens, logout]
  );

  return (
    <ProjectsContext.Provider
      value={{ projects, fetchProjects, totalProjects, fetchProjectDetails }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};
