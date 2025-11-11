import { getResumeContent } from "@/lib/markdown";
import { useMDXComponents } from "@/mdx-components";
import { MDXRemote } from "next-mdx-remote/rsc";

import { Container, Box } from '@mui/material';

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
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box>
        <MDXRemote
          source={resumeData?.content}
          components={components}
          // options={{ scope: scope }} // Uncomment if scope is needed
        />
      </Box>
    </Container>
  );
};

export default ResumePage;