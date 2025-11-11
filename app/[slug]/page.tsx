import { getAllContent, getContentBySlug } from "@/lib/markdown";
import { useMDXComponents } from "@/mdx-components"; // Import useMDXComponents
import { Box, Chip, Container, Stack, Typography } from "@mui/material"; // Import Chip and Stack
import DateComponent from "components/Date";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link"; // Import Link

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
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box>
        {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
          <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Tags:
            </Typography>
            {post.frontmatter.tags.map((tag: string) => (
              <Link href={`/tags/${tag}`} passHref key={tag}>
                <Chip label={tag} size="small" clickable />
              </Link>
            ))}
          </Stack>
        )}
        <DateComponent date={post.frontmatter.publish_date} />
        <MDXRemote
          source={post?.content}
          components={components}
          options={{ scope: scope }}
        />
      </Box>
    </Container>
  );
};

export default PostPage;
