import HUDTitle from '@/components/HUDTitle';
import Panel from '@/components/Panel';
import InteractiveLink from '@/components/InteractiveLink';

// Since this is a server component, we can directly import and use the function
import { getAllContent } from "@/lib/markdown";

async function getPosts() {
  // Directly call the function instead of using fetch
  try {
    const posts = getAllContent("blog");
    return posts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw new Error('Failed to fetch posts');
  }
}

export default async function HomePage() {
  const posts = await getPosts();

  return (
    <div className="py-4" style={{ paddingTop: '16px', paddingBottom: '16px' }}>
      <HUDTitle level={1} className="text-center" style={{ marginBottom: '16px' }}>Blog Posts</HUDTitle>
      
      <div className="space-y-3" style={{ rowGap: '12px' }}>
        {posts.map((post: any) => (
          <Panel
            key={post.slug}
            className="border cursor-pointer"
            style={{
              borderColor: 'rgba(255,255,255, 0.04)',
            }}
            enableHoverEffect={true}
          >
            <InteractiveLink
              href={`/${post.slug}`}
              className="hud-panel-title block mb-2"
              style={{
                marginBottom: '8px',
              }}
            >
              {post.title}
            </InteractiveLink>
            <p className="hud-body mb-2" style={{ color: '#C7CED6', marginBottom: '8px' }}>{post.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-xs uppercase" style={{ color: '#9AA0A6' }}>
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </span>
              <span
                className="text-xs px-2 py-1 rounded hud-label"
                style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
              >
                {post.tags?.[0] || 'Article'}
              </span>
            </div>
          </Panel>
        ))}
      </div>
    </div>
  );
}