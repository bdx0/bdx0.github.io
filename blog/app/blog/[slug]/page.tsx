import { getAllContent, getContentBySlug } from '../../../lib/markdown';
import { MDXRemote } from 'next-mdx-remote/rsc';

export async function generateStaticParams() {
  const posts = getAllContent('blog');
  return posts.map((post: any) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getContentBySlug('blog', params.slug);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <article className="prose lg:prose-xl">
      <h1>{post.frontmatter.title}</h1>
      <p>{post.frontmatter.date}</p>
      <MDXRemote source={post.content} />
    </article>
  );
}
