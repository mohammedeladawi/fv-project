import React, { useCallback, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { ProjectsContext } from "../../context/ProjectsContext";
import ProjectListItem from "./components/ProjectListItem";

export default function ProjectsList() {
  const { projects, fetchProjects, totalProjects } =
    useContext(ProjectsContext);

  const [skip, setSkip] = useState(0);
  const [limit] = useState(3);

  useEffect(() => {
    fetchProjects(skip, limit);
  }, [skip, limit]);

  const handleNext = useCallback(() => {
    if (skip + limit < totalProjects) setSkip(skip + limit);
  }, [skip, limit, totalProjects]);

  const handlePrev = useCallback(() => {
    if (skip - limit >= 0) setSkip(skip - limit);
  }, [skip, limit]);

  return (
    <Container>
      <Title>Projects List</Title>

      {projects && projects.length ? (
        <>
          <List>
            {projects.map((project) => (
              <ProjectListItem key={project._id} project={project} />
            ))}
          </List>

          <Pagination>
            <button onClick={handlePrev} disabled={skip === 0}>
              Prev
            </button>
            <span>
              {skip + 1} - {Math.min(skip + limit, totalProjects)} of{" "}
              {totalProjects}
            </span>
            <button
              onClick={handleNext}
              disabled={skip + limit >= totalProjects}
            >
              Next
            </button>
          </Pagination>
        </>
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

const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;

  & button {
    padding: 6px 12px;
    border: none;
    background-color: #2563eb;
    color: #fff;
    border-radius: 4px;
    cursor: pointer;

    &:disabled {
      background-color: #cbd5e1;
      cursor: not-allowed;
    }
  }

  & span {
    font-weight: 500;
    color: #374151;
  }
`;
