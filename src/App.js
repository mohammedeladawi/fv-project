import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import ProjectsList from "./pages/ProjectsList/ProjectsList";
import ProjectDetails from "./pages/ProjectDetails";

function App() {
  // ========== ToDo: Add Route Guards ==============
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path="/projects">
        <Route index element={<ProjectsList />} />
        <Route path=":id" element={<ProjectDetails />} />
      </Route>
    </Routes>
  );
}

export default App;
