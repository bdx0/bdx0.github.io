import { getAllContent, getContentBySlug } from "@/lib/markdown";
import { useMDXComponents } from "@/mdx-components"; // Import useMDXComponents
import { MDXRemote } from "next-mdx-remote/rsc";

export async function generateStaticParams() {
  const posts = getAllContent("blog");
  return posts.map((post: any) => ({
    slug: post.slug,
  }));
}
const components = useMDXComponents({}); // Spread existing components from useMDXComponents

const PostPage = async ({ params }: { params: { slug: string } }) => {
  const resolvedParams = await params;
  console.log("Generating page for slug:", resolvedParams.slug);
  const slug = resolvedParams.slug;
  const post = await getContentBySlug("blog", slug);

  if (!post) {
    return <div>Post not found</div>;
  }
  const scope = {
    frontmatter: post?.frontmatter,
  };

  return (
    <article className="py-8">
      <div className="prose max-w-none">
        <MDXRemote
          source={post?.content}
          components={components}
          options={{ scope: scope }}
        />
      </div>
    </article>
  );
};

export default PostPage;
