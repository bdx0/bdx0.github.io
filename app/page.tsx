import LinkBehavior from "@/components/LinkBehavior";
import {
  Card,
  CardContent,
  Chip,
  Link as MuiLink, // Import Chip
  Stack,
  Typography,
} from "@mui/material";

// Since this is a server component, we can directly import and use the function
import { getAllContent } from "@/lib/markdown";

async function getPosts() {
  // Directly call the function instead of using fetch
  try {
    const posts = getAllContent("blog");
    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw new Error("Failed to fetch posts");
  }
}

export default async function HomePage() {
  const posts = await getPosts();

  return (
    <div className="py-4">
      <Typography
        variant="h4"
        component="h2"
        align="center"
        sx={{ marginBottom: "16px" }}
      >
        Blog Posts
      </Typography>

      <div className="space-y-3">
        {posts.map((post: any) => (
          <Card key={post.slug} sx={{ marginBottom: "12px" }}>
            <CardContent>
              <MuiLink
                component={LinkBehavior}
                href={`/${post.slug}`}
                underline="hover"
                variant="h6"
                sx={{ marginBottom: "8px" }}
              >
                {post.title}
              </MuiLink>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ marginBottom: "8px" }}
              >
                {post.description}
              </Typography>
              <div className="flex justify-between items-center">
                <Typography
                  variant="caption"
                  color="text.disabled"
                  sx={{ textTransform: "uppercase" }}
                >
                  {new Date(post.publish_date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </Typography>
                {post.tags && post.tags.length > 0 && (
                  <Stack direction="row" spacing={1}>
                    {post.tags.map((tag: string) => (
                      <Chip key={tag} label={tag} size="small" />
                    ))}
                  </Stack>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
