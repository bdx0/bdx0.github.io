import fs from "fs";
import matter from "gray-matter";
import path from "path";

const contentDirectory = path.join(process.cwd(), "content");

export function getAllContent(directory: string) {
	const postsDirectory = path.join(contentDirectory, directory);
	const filenames = fs.readdirSync(postsDirectory);

	const allPosts = filenames
		.map((fileName) => {
			const slug = fileName.replace(/\.mdx?$/, "");
			const fullPath = path.join(postsDirectory, fileName);
			const fileContents = fs.readFileSync(fullPath, "utf8");
			const { data } = matter(fileContents);

			// Filter out specific files that are not individual projects
			if (directory === "projects" && fileName === "page.mdx") {
				return null; // Skip this file
			}

			return {
				slug,
				...data,
			};
		})
		.filter((post) => post !== null); // Remove null entries from the array

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

	const fileContents = fs.readFileSync(fullPath, "utf8");
	const { data, content } = matter(fileContents);

	return {
		slug,
		frontmatter: data,
		content,
	};
}

export async function getPageContent(pageName: string) {
	// Try .mdx first, then .md
	const mdxPath = path.join(contentDirectory, "pages", `${pageName}.mdx`);
	const mdPath = path.join(contentDirectory, "pages", `${pageName}.md`);

	let fullPath: string;
	if (fs.existsSync(mdxPath)) {
		fullPath = mdxPath;
	} else if (fs.existsSync(mdPath)) {
		fullPath = mdPath;
	} else {
		return null;
	}

	const fileContents = fs.readFileSync(fullPath, "utf8");
	const { data, content } = matter(fileContents);

	return {
		frontmatter: data,
		content,
	};
}

export async function getResumeContent() {
	const resumeUrl = "https://bdx0.github.io/cv/resume.md";
	const response = await fetch(resumeUrl);

	if (!response.ok) {
		console.error(
			`Failed to fetch resume content from ${resumeUrl}: ${response.statusText}`,
		);
		return null;
	}

	const fileContents = await response.text();
	const { data, content } = matter(fileContents);

	// Pre-process content to replace 'class=' with 'className=' specifically for <i> tags
	const processedContent = content.replace(
		/<i\s+(.*?)class="([^"]*)"(.*?)>/g,
		(match, p1, p2, p3) => {
			return `<i ${p1}className="${p2}"${p3}>`;
		},
	);

	return {
		frontmatter: data,
		content: processedContent,
	};
}
