// app/resume/page.tsx
import { getResumeContent } from "@/lib/markdown";
import { useMDXComponents } from "@/mdx-components";
import { MDXRemote } from "next-mdx-remote/rsc";
import { serialize } from "next-mdx-remote/serialize";
import type { Literal, Node } from "unist";
import { visit } from "unist-util-visit"; // Import visit
import type { VFile } from "vfile";

import { Box, Container } from "@mui/material";

// --- Định nghĩa plugin log AST trực tiếp trong file ---
// Plugin này sẽ duyệt qua cây AST và log thông tin của từng node
function logAstNodesPlugin() {
  return function (tree: Node, file: VFile) {
    console.log(
      `--- Logging AST Nodes for file: ${file.path || "in-memory"} ---`
    );
    console.log(`tree object:`, tree);
    let nodeCount = 0;
    // Sử dụng visit từ unist-util-visit
    visit(tree, { type: /.*/ }, (node: Node) => {
      // type: /.*/ khớp với mọi loại node
      nodeCount++;
      // Log thông tin cơ bản về node
      const nodeValue = (node as Literal).value;
      const nodeInfo = {
        type: node.type,
        value:
          typeof nodeValue === "string"
            ? nodeValue.substring(0, 50) + (nodeValue.length > 50 ? "..." : "")
            : "N/A",
        // depth: this.depth, // 'this.depth' is not available with direct visit
      };
      console.log(`Node ${nodeCount}: ${JSON.stringify(nodeInfo)}`);
    });
    console.log(`--- Finished logging ${nodeCount} AST nodes ---`);
  };
}
// --- Kết thúc định nghĩa plugin ---

const ResumePage = async () => {
  const resume = await getResumeContent();

  if (!resume) {
    return <div>Resume content not found.</div>;
  }

  // Định nghĩa các tùy chọn MDX, bao gồm cả plugin log AST
  const mdxOptions = {
    remarkPlugins: [
      logAstNodesPlugin, // Sử dụng plugin đã định nghĩa ở trên
    ],
  };

  // Sử dụng serialize với mdxOptions để chạy plugin
  const mdxSourceSerialized = await serialize(resume.content, {
    mdxOptions: mdxOptions,
  });

  // Lấy các global components
  const components = useMDXComponents({});

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box>
        {/* MDXRemote sẽ render nội dung đã biên dịch */}
        <MDXRemote source={mdxSourceSerialized} components={components} />
      </Box>
    </Container>
  );
};

export default ResumePage;
