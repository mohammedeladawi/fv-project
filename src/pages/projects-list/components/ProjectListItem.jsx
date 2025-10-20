import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ProjectListItem = ({ project }) => {
  if (!project) return null;

  return (
    <ProjectItem key={project._id}>
      <StyledLink to={`/projects/${project._id}`} key={project._id}>
        <Header>
          <strong>{project.name}</strong>
          <span>
            {project.type} - {project.status}
          </span>
        </Header>

        <Section>
          <SectionTitle>Category:</SectionTitle> {project.category || "-"}
        </Section>

        <Section>
          <SectionTitle>Finance Status:</SectionTitle>{" "}
          {project.financeStatus || "-"}
        </Section>

        <Section>
          <SectionTitle>Start Date:</SectionTitle>{" "}
          {project.startDate
            ? new Date(project.startDate).toLocaleDateString()
            : "-"}
        </Section>

        <Section>
          <SectionTitle>Progress:</SectionTitle> {project.progress ?? "-"}
        </Section>

        <Section>
          <SectionTitle>Clients:</SectionTitle>
          <List>
            {project.clients?.length ? (
              project.clients.map((client) => (
                <ListItem key={client.id}>{client.name}</ListItem>
              ))
            ) : (
              <ListItem>-</ListItem>
            )}
          </List>
        </Section>

        <Section>
          <SectionTitle>Users:</SectionTitle>
          <List>
            {project.users?.length ? (
              project.users.map((user) => (
                <ListItem key={user.id}>
                  {user.fullName || "-"} - {user.positions?.join(", ") || "-"} -{" "}
                  {user.nationality?.name || "-"}{" "}
                  {user.nationality?.emoji || ""}
                </ListItem>
              ))
            ) : (
              <ListItem>-</ListItem>
            )}
          </List>
        </Section>

        <Section>
          <SectionTitle>Address:</SectionTitle>{" "}
          {project.address?.city?.en || "-"},{" "}
          {project.address?.country?.name || "-"} - Zone{" "}
          {project.address?.zone || "-"}, Sector{" "}
          {project.address?.sector || "-"}, Plot {project.address?.plot || "-"},
          Location {project.address?.location || "-"}
        </Section>

        <Section>
          <SectionTitle>Created At:</SectionTitle>{" "}
          {project.createdAt
            ? new Date(project.createdAt).toLocaleDateString()
            : "-"}
        </Section>

        <Section>
          <SectionTitle>Updated At:</SectionTitle>{" "}
          {project.updatedAt
            ? new Date(project.updatedAt).toLocaleDateString()
            : "-"}
        </Section>
      </StyledLink>
    </ProjectItem>
  );
};

const ProjectItem = styled.li`
  background-color: #ffffff;
  padding: 20px;
  margin-bottom: 16px;
  border-radius: 10px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & strong {
    font-size: 20px;
    color: #111827;
  }

  & span {
    color: #6b7280;
    font-weight: 500;
  }
`;

const Section = styled.div`
  font-size: 15px;
  color: #4b5563;
`;

const SectionTitle = styled.span`
  font-weight: 600;
  color: #1f2937;
`;

const List = styled.ul`
  list-style: none;
  padding-left: 12px;
  margin: 4px 0 0 0;
`;

const ListItem = styled.li`
  color: #4b5563;
  margin: 2px 0;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

export default ProjectListItem;
