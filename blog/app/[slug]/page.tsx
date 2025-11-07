import { getAllContent, getContentBySlug } from "@/lib/markdown";
import { MDXRemote as OriginalMDXRemote } from "next-mdx-remote/rsc";

export async function generateStaticParams() {
  const posts = getAllContent("blog");
  return posts.map((post: any) => ({
    slug: post.slug,
  }));
}

const PostPage = async ({ params }: { params: { slug: string } }) => {
  const resolvedParams = await params;
  console.log("Generating page for slug:", resolvedParams.slug);
  const slug = resolvedParams.slug;
  const post = await getContentBySlug("blog", slug);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <article className="py-8">
      <h1 className="text-5xl font-bold mb-4 text-blue-400">
        {post.frontmatter.title}
      </h1>{" "}
      <p className="text-gray-500 text-sm mb-8">
        {new Date(post.frontmatter.date).toDateString()}
      </p>
      <div className="prose max-w-none">
        <OriginalMDXRemote source={post.content} />
      </div>
    </article>
  );
};

export default PostPage;
