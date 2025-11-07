import { getAllContent } from '../lib/markdown';
import Link from 'next/link';

export default function HomePage() {
  const posts = getAllContent('blog');

  return (
    <div className="py-8">
      <h1 className="text-5xl font-bold mb-8 text-neon-blue">Posts</h1> {/* Using neon blue for heading */}
      <ul className="space-y-10">
        {posts.map((post: any) => (
          <li key={post.slug} className="p-6 border border-gray-700 rounded-lg shadow-neon-blue-glow hover:shadow-neon-green-glow transition-shadow duration-300 bg-cyber-bg/50 backdrop-blur-sm"> {/* Cyberpunk styling with glow */}
            <Link href={`/${post.slug}`} className="text-3xl font-bold text-neon-blue hover:text-neon-green block mb-2"> {/* Neon colors for title */}
              {post.title}
            </Link>
            <p className="text-cyber-text text-lg mb-4">{post.description}</p> {/* Cyberpunk text color */}
            <p className="text-gray-500 text-sm">{new Date(post.date).toDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}