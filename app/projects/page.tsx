import Link from "next/link";
import { getAllContent } from "@/lib/markdown";

// Fetch all projects for the landing page
export async function generateStaticParams() {
  const projects = getAllContent("projects");
  return projects;
}

const ProjectsPage = async () => {
  const projects = await getAllContent("projects");

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8">Projects</h1>
      <div className="flex flex-col gap-4">
        {projects.map((project: any) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`} // Link to the individual project page
            className="block p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            style={{ backgroundColor: 'rgba(10,12,16,0.8)', border: '1px solid rgba(255,255,255, 0.04)' }}
          >
            <h2 className="text-2xl font-semibold mb-3" style={{ color: '#00E6FF' }}>{project.title}</h2>
            <p className="text-[#C7CED6]">{project.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;
