import { getResumeContent } from "@/lib/markdown";
import { useMDXComponents } from "@/mdx-components";
import { MDXRemote } from "next-mdx-remote/rsc";

const ResumePage = async () => {
  const resumeData = await getResumeContent();

  if (!resumeData) {
    return <div>Resume content not found.</div>;
  }

  // Prepare scope for MDXRemote if needed, though resume might not require dynamic scope
  // const scope = {
  //   frontmatter: resumeData?.frontmatter,
  // };

  // Get components from mdx-components.tsx
  const components = useMDXComponents({});

  return (
    <article className="py-8">
      <div className="prose max-w-none">
        <MDXRemote
          source={resumeData?.content}
          components={components}
          // options={{ scope: scope }} // Uncomment if scope is needed
        />
      </div>
    </article>
  );
};

export default ResumePage;