// app/resume/page.tsx
import { getResumeContent } from "@/lib/markdown";
import { useMDXComponents } from "@/mdx-components"; // Re-introduce this
import React from "react"; // Required for rehype-react's createElement and Fragment
import { jsx, jsxs } from "react/jsx-runtime"; // New import

// Imports for the unified pipeline
import rehypeReact from "rehype-react"; // Re-introduce this
import remarkParse from "remark-parse"; // Re-add remarkParse
import remarkMdx from "remark-mdx"; // Correct import for remark-mdx plugin
import remarkGfm from "remark-gfm"; // New import
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw"; // Re-add rehypeRaw
import rehypeAttr from "rehype-attr"; // New import
import { unified } from "unified";
import type { Node } from "unist"; // Import Node for plugin type definition

// No longer needed: rehypeStringify
// import rehypeStringify from "rehype-stringify";

import { Box, Container } from "@mui/material"; // Re-add Material UI imports

// --- Temporary plugin to log HAST ---
function logHastPlugin() {
  return (tree: Node) => {
    console.log('--- Logging HAST Tree Object ---');
    console.log(JSON.stringify(tree, null, 2));
    console.log('--- Finished logging HAST Tree Object ---');
  };
}
// --- End temporary plugin ---

const ResumePage = async () => {
  const resume = await getResumeContent();

  if (!resume) {
    return <div>Resume content not found.</div>;
  }

  // Get custom components from useMDXComponents
  const components = useMDXComponents({}); // Get custom components
  console.log("Components passed to rehypeReact:", components); // Log components object

  // Create the unified processor pipeline
  const processor = unified()
    .use(remarkParse) // Explicitly set the Markdown parser
    .use(remarkMdx) // Then use the MDX plugin
    .use(remarkGfm) // Add remark-gfm for GitHub Flavored Markdown
    .use(remarkRehype) // Step 2: Convert mdast to hast (HTML AST)
    .use(rehypeRaw) // Re-add rehype-raw to parse raw HTML
    .use(rehypeAttr) // Add rehype-attr to handle attributes like class -> className
    .use(logHastPlugin) // Temporary: Log HAST before rehypeReact
    .use(rehypeReact, { // Step 3: Convert hast to React elements
      createElement: React.createElement,
      Fragment: React.Fragment,
      jsx: jsx, // Explicitly pass jsx
      jsxs: jsxs, // Explicitly pass jsxs
      components: components, // Pass our custom components
    });

  // Process the content and get the React elements
  const content = processor.processSync(resume.content).result;

  return (
    // Wrap the content in Container and Box
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box>
        <div>{content}</div>
      </Box>
    </Container>
  );
};

export default ResumePage;
