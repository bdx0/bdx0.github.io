"use client";

import Link from "next/link";
import RenderColorPalette from "./RenderColorPalette";
import RenderTypography from "./RenderTypography";
import RenderSpacingSystem from "./RenderSpacingSystem";
import RenderComponentStyles from "./RenderComponentStyles";
import RenderShadowsAndElevation from "./RenderShadowsAndElevation";
import RenderAnimationsAndTransitions from "./RenderAnimationsAndTransitions";
import RenderBorderRadius from "./RenderBorderRadius";
import RenderOpacityAndTransparency from "./RenderOpacityAndTransparency";
import RenderAccessibilityNotes from "./RenderAccessibilityNotes";
import RenderAssetsAndIconography from "./RenderAssetsAndIconography";
import RenderTailwindUsage from "./RenderTailwindUsage";
import RenderExampleComponents from "./RenderExampleComponents";
import RenderPatternsAndExamples from "./RenderPatternsAndExamples";
import RenderResponsiveLayout from "./RenderResponsiveLayout";
import RenderImplementationChecklist from "./RenderImplementationChecklist";
import RenderCssVariableStarter from "./RenderCssVariableStarter";
import RenderFontsStyle from "./RenderFontsStyle";
import ExpandableSection from "./ExpandableSection"; // Import the new component

export default function DesignSystemPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Design System - Font Showcase</h1>
      <p className="mb-4">
        This page showcases various fonts, with a focus on their rendering for
        academic, technical, and Vietnamese content.
      </p>
      <h2 className="text-3xl font-bold mb-6">Design Tokens</h2>

      <ExpandableSection title="Color Palette">
        <RenderColorPalette />
      </ExpandableSection>

      <ExpandableSection title="Typography">
        <RenderTypography />
      </ExpandableSection>

      <ExpandableSection title="Spacing System">
        <RenderSpacingSystem />
      </ExpandableSection>

      <ExpandableSection title="Component Styles">
        <RenderComponentStyles />
      </ExpandableSection>

      <ExpandableSection title="Shadows & Elevation">
        <RenderShadowsAndElevation />
      </ExpandableSection>

      <ExpandableSection title="Animations & Transitions">
        <RenderAnimationsAndTransitions />
      </ExpandableSection>

      <ExpandableSection title="Border Radius">
        <RenderBorderRadius />
      </ExpandableSection>

      <ExpandableSection title="Opacity & Transparency">
        <RenderOpacityAndTransparency />
      </ExpandableSection>

      <ExpandableSection title="Accessibility Notes">
        <RenderAccessibilityNotes />
      </ExpandableSection>

      <ExpandableSection title="Assets & Iconography">
        <RenderAssetsAndIconography />
      </ExpandableSection>

      <ExpandableSection title="Common Tailwind CSS Usage">
        <RenderTailwindUsage />
      </ExpandableSection>

      <ExpandableSection title="Example Component Reference Design Code (React + Tailwind)">
        <RenderExampleComponents />
      </ExpandableSection>

      <ExpandableSection title="Patterns & Examples">
        <RenderPatternsAndExamples />
      </ExpandableSection>

      <ExpandableSection title="Responsive & Layout Considerations">
        <RenderResponsiveLayout />
      </ExpandableSection>

      <ExpandableSection title="Implementation Checklist">
        <RenderImplementationChecklist />
      </ExpandableSection>

      <ExpandableSection title="Appendix — CSS Variable Starter (from globals.css)">
        <RenderCssVariableStarter />
      </ExpandableSection>

      <ExpandableSection title="Fonts Style">
        <RenderFontsStyle />
      </ExpandableSection>

      <div className="mt-12 text-center">
        <Link href="/" className="text-blue-400 hover:underline">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
