import fs from "fs";
import path from "path";

type BlogPageProps = { params: { slug: string } };
export default function BlogPage({ params }: BlogPageProps) {
  return (
    <div className="container mx-auto p-4 bg-slate-700">
      <h2 className="text-xl">{params.slug}</h2>
    </div>
  );
}

export async function generateStaticParams() {
  //   const blogPosts = ["first-mdx-post"]; // FIXME: Read from file system
  const blogPath = path.join(process.cwd(), "src", "blog");
  console.log(blogPath);
  const blogPosts = fs.readdirSync(blogPath);

  const blogStaticParams = blogPosts.map((post) => ({
    slug: post.replace(".mdx", ""),
  }));

  return blogStaticParams;
}

// export async function generateMetadata({
//   params,
// }: BlogPageProps): Promise<Metadata> {
//   console.log(params);
//   const { metadata } = await getBlogPostMetadata(params.slug);
//   if (metadata) {
//     return metadata;
//   } else {
//     throw new Error(`No metadata found for blog post: $ {params.slug}`);
//   }
// }
