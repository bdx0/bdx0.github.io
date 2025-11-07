import { getAllContent } from '../../../lib/markdown';
import Link from 'next/link';

export default function ProjectsPage() {
  const projects = getAllContent('projects');

  return (
    <div>
      <h1 className="text-4xl font-bold">Projects</h1>
      <ul className="mt-4 space-y-4">
        {projects.map((project: any) => (
          <li key={project.slug}>
            <Link href={`/about/projects/${project.slug}`} className="text-2xl font-bold hover:underline">
              {project.title}
            </Link>
            <p className="text-gray-600">{project.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
