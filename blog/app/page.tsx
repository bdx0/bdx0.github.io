import { getAllContent } from "@/lib/markdown";
import Link from "next/link";

export default function HomePage() {
  const posts = getAllContent("blog");

  return (
    <div className="py-8">
      <h1 className="text-5xl font-bold mb-8 text-blue-400">Posts</h1>{" "}
      {/* Using standard Tailwind blue */}
      <ul className="space-y-10">
        {posts.map((post: any) => (
          <li
            key={post.slug}
            className="p-6 border border-gray-700 rounded-lg shadow-lg hover:shadow-blue-500 transition-shadow duration-300 bg-gray-800/50 backdrop-blur-sm"
          >
            {" "}
            {/* Standard dark theme styling */}
            <Link
              href={`/${post.slug}`}
              className="text-3xl font-bold text-blue-400 hover:text-green-400 block mb-2 transition-colors duration-200"
            >
              {" "}
              {/* Standard blue/green for title */}
              {post.title}
            </Link>
            <p className="text-gray-300 text-lg mb-4">{post.description}</p>{" "}
            {/* Standard light text */}
            <p className="text-gray-500 text-sm">
              {new Date(post.date).toDateString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
