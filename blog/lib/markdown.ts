import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), '../content');

export function getAllContent(directory: string) {
  const postsDirectory = path.join(contentDirectory, directory);
  const filenames = fs.readdirSync(postsDirectory);

  const allPosts = filenames.map((fileName) => {
    const slug = fileName.replace(/\.mdx?$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);

    return {
      slug,
      ...data,
    };
  });

  return allPosts;
}

export async function getContentBySlug(directory: string, slug: string) {
  const fullPath = path.join(contentDirectory, directory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) {
    return null;
  }
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    frontmatter: data,
    content,
  };
}

export async function getPageContent(pageName: string) {
    const fullPath = path.join(contentDirectory, 'pages', `${pageName}.md`);
    if (!fs.existsSync(fullPath)) {
        return null;
    }
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
        frontmatter: data,
        content,
    };
}
