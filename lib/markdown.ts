import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

console.log(`current path: ${process.cwd()}`)
const contentDirectory = path.join(process.cwd(), 'content');

export function getAllContent(directory: string) {
  const postsDirectory = path.join(contentDirectory, directory);
  const filenames = fs.readdirSync(postsDirectory);

  const allPosts = filenames.map((fileName) => {
    const slug = fileName.replace(/\.mdx?$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);

    // Filter out specific files that are not individual projects
    if (directory === 'projects' && (fileName === 'page.mdx')) {
      return null; // Skip this file
    }

    return {
      slug,
      ...data,
    };
  }).filter(post => post !== null); // Remove null entries from the array

  return allPosts;
}

export async function getContentBySlug(directory: string, slug: string) {
  // Try .mdx first, then .md
  const mdxPath = path.join(contentDirectory, directory, `${slug}.mdx`);
  const mdPath = path.join(contentDirectory, directory, `${slug}.md`);

  let fullPath: string;
  if (fs.existsSync(mdxPath)) {
    fullPath = mdxPath;
  } else if (fs.existsSync(mdPath)) {
    fullPath = mdPath;
  } else {
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
  // Try .mdx first, then .md
  const mdxPath = path.join(contentDirectory, 'pages', `${pageName}.mdx`);
  const mdPath = path.join(contentDirectory, 'pages', `${pageName}.md`);

  let fullPath: string;
  if (fs.existsSync(mdxPath)) {
    fullPath = mdxPath;
  } else if (fs.existsSync(mdPath)) {
    fullPath = mdPath;
  } else {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    frontmatter: data,
    content,
  };
}

export async function getResumeContent() {
  // Try .mdx first, then .md
  const mdxPath = path.join(contentDirectory, 'resume.mdx');
  const mdPath = path.join(contentDirectory, 'resume.md');

  let fullPath: string;
  if (fs.existsSync(mdxPath)) {
    fullPath = mdxPath;
  } else if (fs.existsSync(mdPath)) {
    fullPath = mdPath;
  } else {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    frontmatter: data,
    content,
  };
}
