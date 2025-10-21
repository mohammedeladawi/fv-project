import { memo, useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import { ProjectsContext } from "../../context/ProjectsContext";

const ProjectDetails = () => {
  const [project, setProject] = useState(null);
  const { id } = useParams();
  const { fetchProjectDetails } = useContext(ProjectsContext);

  useEffect(() => {
    const loadProject = async () => {
      const project = await fetchProjectDetails(id);
      setProject(project);
    };

    loadProject();
  }, [id, fetchProjectDetails]);

  console.log("PROJECT D");
  if (!project) return <h2>Loading...</h2>;

  return (
    <Container>
      <BackLink to="/projects">&larr; Back to Projects</BackLink>

      <Header>
        <h2>{project.name}</h2>
        <span>
          {project.type} - {project.status}
        </span>
      </Header>

      <Section>
        <SectionTitle>Number:</SectionTitle> {project.number}
      </Section>

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
        <SectionTitle>Company:</SectionTitle> {project.company?.name || "-"}
      </Section>

      <Section>
        <SectionTitle>Clients:</SectionTitle>
        <List>
          {project.clients?.length ? (
            project.clients.map((c) => <ListItem key={c.id}>{c.name}</ListItem>)
          ) : (
            <ListItem>-</ListItem>
          )}
        </List>
      </Section>

      <Section>
        <SectionTitle>Users:</SectionTitle>
        <List>
          {project.users?.length ? (
            project.users.map((u) => (
              <ListItem key={u.id}>
                {u.fullName || "-"} - {u.positions?.join(", ") || "-"} -{" "}
                {u.nationality?.name || "-"} {u.nationality?.emoji || ""}
              </ListItem>
            ))
          ) : (
            <ListItem>-</ListItem>
          )}
        </List>
      </Section>

      <Section>
        <SectionTitle>Address:</SectionTitle> {project.address?.city?.en || "-"}
        , {project.address?.country?.name || "-"} - Zone{" "}
        {project.address?.zone || "-"}, Sector {project.address?.sector || "-"},
        Plot {project.address?.plot || "-"}, Location{" "}
        {project.address?.location || "-"}
      </Section>

      <Section>
        <SectionTitle>Settings:</SectionTitle> Site Visit Interval:{" "}
        {project.setting?.siteVisit?.interval ?? "-"} days
      </Section>

      <Section>
        <SectionTitle>Reminders:</SectionTitle> Overdue Site Visit - Email:{" "}
        {project.reminder?.overdueSiteVisit?.email ? "Yes" : "No"}, SMS:{" "}
        {project.reminder?.overdueSiteVisit?.sms ? "Yes" : "No"}, Notification:{" "}
        {project.reminder?.overdueSiteVisit?.notification ? "Yes" : "No"}
      </Section>

      <Section>
        <SectionTitle>Phases:</SectionTitle>
        <List>
          {project.phases?.length ? (
            project.phases.map((phase) => (
              <ListItem key={phase._id}>
                <PhaseColor color={phase.color} /> {phase.number}. {phase.name}{" "}
                - {phase.description} (Avg: {phase.avgProgress})
              </ListItem>
            ))
          ) : (
            <ListItem>-</ListItem>
          )}
        </List>
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
    </Container>
  );
};

const Container = styled.div`
  max-width: 900px;
  margin: 40px auto;
  padding: 24px;
  background-color: #f9fafb;
  border-radius: 12px;
`;

const BackLink = styled(Link)`
  display: inline-block;
  margin-bottom: 20px;
  color: #2563eb;
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 16px;

  & h2 {
    font-size: 24px;
    color: #111827;
    margin: 0;
  }

  & span {
    color: #6b7280;
    font-weight: 500;
  }
`;

const Section = styled.div`
  margin-bottom: 12px;
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
  margin: 2px 0;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const PhaseColor = styled.span`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: ${(props) => props.color || "#000"};
  display: inline-block;
`;

export default ProjectDetails;
