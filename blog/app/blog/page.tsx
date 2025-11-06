import { getAllContent } from '../../lib/markdown';
import Link from 'next/link';

export default function BlogPage() {
  const posts = getAllContent('blog');

  return (
    <div>
      <h1 className="text-4xl font-bold">Blog</h1>
      <ul className="mt-4 space-y-4">
        {posts.map((post: any) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`} className="text-2xl font-bold hover:underline">
              {post.title}
            </Link>
            <p className="text-gray-600">{post.description}</p>
            <p className="text-sm text-gray-500">{new Date(post.date).toDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
