// API route to fetch blog posts
import { getAllContent } from "@/lib/markdown";
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const posts = getAllContent("blog");
    return Response.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return Response.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}