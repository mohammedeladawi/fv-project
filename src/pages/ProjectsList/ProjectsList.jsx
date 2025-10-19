import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { ProjectsContext } from "../../context/ProjectsContext";
import ProjectListItem from "./ProjectListItem";

export default function ProjectsList() {
  const { projects, fetchProjects } = useContext(ProjectsContext);

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <Container>
      <Title>Projects List</Title>

      {projects && projects.length ? (
        <List>
          {projects.map((project) => (
            <ProjectListItem project={project} />
          ))}
        </List>
      ) : (
        <ErrorMessage>There are no projects</ErrorMessage>
      )}
    </Container>
  );
}

const Container = styled.div`
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  background-color: #f9fafb;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 24px;
  font-size: 28px;
  color: #1f2937;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ErrorMessage = styled.h3`
  text-align: center;
  color: #ef4444;
  margin-top: 20px;
  font-size: 18px;
`;
