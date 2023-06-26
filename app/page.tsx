import { ProjectInterface, ProjectsSearch } from "@/common.types";
import { fetchAllProjects } from "@/lib/actions";
import { Categories, Pagination, ProjectCard } from "@/components/client";

type SearchParams = {
  category?: string;
  endcursor?: string;
};

type Props = {
  searchParams: SearchParams;
};

const Home = async (searchParams: Props) => {
  const { category, endcursor } = searchParams?.searchParams || {};

  const data = (await fetchAllProjects(category, endcursor)) as ProjectsSearch;

  const projectsToDisplay = data?.projectSearch?.edges || [];

  if (projectsToDisplay.length === 0) {
    return (
      <section className="flexStart flex-col paddings">
        <Categories />
        <p className="no-result-text text-center">
          No projects found. Be the first to add a project!
        </p>
      </section>
    );
  }

  const pagination = data?.projectSearch?.pageInfo;

  return (
    <section className="flex-start flex-col paddings mb-16">
      <Categories />
      <section className="projects-grid">
        {projectsToDisplay.map(({ node }: { node: ProjectInterface }) => (
          <ProjectCard
            key={node?.id}
            id={node?.id}
            image={node?.image}
            title={node?.title}
            name={node?.createdBy?.name}
            avatarUrl={node?.createdBy?.avatarUrl}
            userId={node?.createdBy?.id}
          />
        ))}
      </section>
      <Pagination
        startCursor={pagination.startCursor}
        endCursor={pagination.endCursor}
        hasPreviousPage={pagination.hasPreviousPage}
        hasNextPage={pagination.hasNextPage}
      />
    </section>
  );
};

export default Home;
