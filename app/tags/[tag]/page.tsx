import { getAllContent } from "@/lib/markdown";
import { Box, Container, Typography } from "@mui/material";
import Link from "next/link";

export async function generateStaticParams() {
  const posts = getAllContent("blog");
  const tags = new Set<string>();
  posts.forEach((post: any) => {
    if (post.tags) {
      post.tags.forEach((tag: string) => tags.add(tag));
    }
  });
  return Array.from(tags).map((tag) => ({
    tag: tag,
  }));
}

const TagPage = async ({ params }: { params: { tag: string } }) => {
  const resolvedParams = await params;
  const decodedTag = decodeURIComponent(resolvedParams.tag);
  const allPosts = getAllContent("blog");
  const filteredPosts = allPosts.filter((post: any) => {
    if (!Array.isArray(post.tags)) {
      return false;
    }
    const postTagsLower = post.tags.map((t: string) => t.toLowerCase());
    const urlTagLower = decodedTag.toLowerCase();
    return postTagsLower.includes(urlTagLower);
  });

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Posts tagged with &quot;{decodedTag}&quot;
      </Typography>
      <Box>
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post: any) => (
            <Box key={post.slug} sx={{ mb: 1 }}>
              <Typography variant="h6" component="h2">
                <Link href={`/${post.slug}`}>{post.title}</Link>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {post.publish_date}
              </Typography>
            </Box>
          ))
        ) : (
          <Typography>No posts found for this tag.</Typography>
        )}
      </Box>
    </Container>
  );
};

export default TagPage;
