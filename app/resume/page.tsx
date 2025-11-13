import { getResumeContent } from "@/lib/markdown";
import { useMDXComponents } from "@/mdx-components";
import { MDXRemote } from "next-mdx-remote/rsc";
import { serialize } from "next-mdx-remote/serialize";
import { visit } from 'unist-util-visit';
import { nanoid } from 'nanoid';
import { Node, Parent } from 'unist'; // Import Node and Parent type from unist
import { Root } from 'mdast'; // Import Root type from mdast

import {
  Container,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Define a custom type for our expandable section node
interface ExpandableSectionNode extends Node {
  type: 'expandableSection';
  id: string;
  data: {
    hProperties: {
      id: string;
    };
  };
  children: any[]; // Children are now explicitly any[]
}

// Local remark plugin to group h2 and subsequent content
const remarkExpandableH2 = () => {
  return (tree: Root) => {
    console.log('AST before transformation:', JSON.stringify(tree, null, 2)); // Log AST before transformation
    const nodesToProcess: { node: Node; index: number | null | undefined; parent: Node | null | undefined }[] = [];

    // First pass: collect all h2 nodes and their positions
    visit(tree, 'heading', (node: Node, index: number | null | undefined, parent: Node | null | undefined) => {
      if ((node as any).depth === 2) {
        nodesToProcess.push({ node, index, parent });
      }
    });

    // Process nodes in reverse order to avoid index issues during modification
    for (let i = nodesToProcess.length - 1; i >= 0; i--) {
      const { node: h2Node, index: h2Index, parent } = nodesToProcess[i];

      if (h2Index === null || h2Index === undefined || parent === null || parent === undefined) continue;

      const actualParent = parent as Parent; // Assert parent as Parent
      const contentNodes: Node[] = [];
      let endIndex = h2Index + 1;

      // Collect all sibling nodes until the next h2 or higher-level heading
      while (endIndex < actualParent.children.length) {
        const currentNode = actualParent.children[endIndex];
        if (currentNode.type === 'heading' && (currentNode as any).depth <= 2) {
          break; // Stop at the next h2 or higher heading
        }
        contentNodes.push(currentNode);
        endIndex++;
      }

      // Create the new expandableSection node
      const id = nanoid();
      const expandableSection: ExpandableSectionNode = {
        type: 'expandableSection',
        id: id,
        data: {
          hProperties: {
            id: id,
          },
        },
        children: [h2Node, ...contentNodes],
      };

      // Replace the h2 and its content with the new expandableSection
      actualParent.children.splice(h2Index, contentNodes.length + 1, expandableSection);
    }
    console.log('AST after transformation:', JSON.stringify(tree, null, 2)); // Log AST after transformation
  };
};

// Local ExpandableSection component
const ExpandableSection = ({ children }: { children: any[] }) => {
  console.log('ExpandableSection children:', children); // Log children received by ExpandableSection
  const h2Element = children[0]; // The first child is the h2
  const contentElements = children.slice(1); // The rest are the grouped content

  return (
    <Accordion elevation={0} sx={{ bgcolor: 'transparent', '&.Mui-expanded': { margin: 0 } }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        sx={{
          minHeight: 'unset',
          '& .MuiAccordionSummary-content': { margin: '12px 0' },
          '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
            transform: 'rotate(45deg)',
          },
        }}
      >
        {h2Element}
      </AccordionSummary>
      <AccordionDetails>
        {contentElements}
      </AccordionDetails>
    </Accordion>
  );
};


const ResumePage = async () => {
  const resumeData = await getResumeContent();

  if (!resumeData) {
    return <div>Resume content not found.</div>;
  }

  console.log('Raw resume content:', resumeData.content); // Log raw content

  // Serialize the content with the local remark plugin
  const mdxSource = await serialize(resumeData.content, {
    mdxOptions: {
      remarkPlugins: [remarkExpandableH2],
    },
  });

  console.log('Serialized MDX source:', mdxSource); // Log serialized source

  // Get global components and add our local expandableSection component
  const components = {
    ...useMDXComponents({}),
    expandableSection: ExpandableSection,
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box>
        <MDXRemote
          source={mdxSource}
          components={components}
        />
      </Box>
    </Container>
  );
};

export default ResumePage;