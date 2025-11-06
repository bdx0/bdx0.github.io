import { getAllContent, getContentBySlug } from '../../../lib/markdown';
import { MDXRemote } from 'next-mdx-remote/rsc';

export async function generateStaticParams() {
  const projects = getAllContent('projects');
  return projects.map((project: any) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const project = await getContentBySlug('projects', params.slug);

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <article className="prose lg:prose-xl">
      <h1>{project.frontmatter.title}</h1>
      <MDXRemote source={project.content} />
    </article>
  );
}
