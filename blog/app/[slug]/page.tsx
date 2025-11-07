import { getAllContent, getContentBySlug } from '../../lib/markdown';
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
    <article className="py-8">
      <h1 className="text-5xl font-bold mb-4 text-blue-400">{post.frontmatter.title}</h1> {/* Standard Tailwind blue heading */}
      <p className="text-gray-500 text-sm mb-8">{new Date(post.frontmatter.date).toDateString()}</p>
      <div className="prose max-w-none"> {/* prose for markdown content, max-w-none to let layout control width */}
        <MDXRemote source={post.content} />
      </div>
    </article>
  );
}
