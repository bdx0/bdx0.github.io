import { notFound } from "next/navigation";
import type { Metadata } from "next/types";
export type PostMetadata = Metadata & {
    title: string;
    description: string;
};
export type BlogPostData = {
    slug: string;
    metadata: Metadata;
};

export async function getBlogPostMetadata(slug: string): Promise<BlogPostData> {
    try {
        console.log(slug);
        const file = await import("@/blog/" + slug + ".mdx");
        if (file?.metadata) {
            if (!file.metadata.title || !file.metadata.description) {
                throw new Error(`Missing some required metadata fields in: ${slug}`);
            } else {
                return {
                    slug,
                    metadata: file.metadata,
                };
            }
        } else {
            throw new Error(`Unable to find metabase for ${slug}.mdx`);
        }
    } catch (err: any) {
        console.error(err?.message);
        return notFound();
    }
}
