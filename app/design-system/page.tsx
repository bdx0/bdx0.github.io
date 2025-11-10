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
import RenderPatternsAndExamples from "./RenderPatternsAndExamples";
import RenderResponsiveLayout from "./RenderResponsiveLayout";
import RenderImplementationChecklist from "./RenderImplementationChecklist";
import RenderCssVariableStarter from "./RenderCssVariableStarter";
import RenderFontsStyle from "./RenderFontsStyle";
import ExpandableSection from "./ExpandableSection"; // Import the new component

export default function DesignSystemPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Cyberpunk HUD — Hướng dẫn Design Tokens mở rộng cho Material Design</h1>
      <p className="mb-4">
        Trang này trình bày các design token và nguyên tắc phong cách để tùy chỉnh (theme) Material Design theo hướng thẩm mỹ techno/cyberpunk, đảm bảo tính nhất quán và duy trì tính thẩm mỹ riêng biệt trên tất cả các yếu tố UI.
      </p>
      <h2 className="text-3xl font-bold mb-6">Các Danh mục Design Tokens</h2>

      <ExpandableSection title="1. Màu sắc (Color Tokens)">
        <RenderColorPalette />
      </ExpandableSection>

      <ExpandableSection title="2. Typography Tokens (Kiểu chữ)">
        <RenderTypography />
      </ExpandableSection>

      <ExpandableSection title="3. Spacing Tokens (Hệ thống khoảng cách)">
        <RenderSpacingSystem />
      </ExpandableSection>

      <ExpandableSection title="4. Elevation & Shadow Tokens (Bóng đổ & Độ cao)">
        <RenderShadowsAndElevation />
      </ExpandableSection>

      <ExpandableSection title="5. Border Radius Tokens (Bo góc)">
        <RenderBorderRadius />
      </ExpandableSection>

      <ExpandableSection title="6. Opacity & Transparency Tokens (Độ mờ & Độ trong suốt)">
        <RenderOpacityAndTransparency />
      </ExpandableSection>

      <ExpandableSection title="7. Animation & Transition Tokens (Hoạt ảnh & Chuyển tiếp)">
        <RenderAnimationsAndTransitions />
      </ExpandableSection>

      <ExpandableSection title="8. Assets & Iconography Tokens (Tài sản & Iconography)">
        <RenderAssetsAndIconography />
      </ExpandableSection>

      <h2 className="text-3xl font-bold mb-6 mt-12">Nguyên tắc Phong cách và Triển khai</h2>

      <ExpandableSection title="Phong cách thành phần (Theming Material Design Components)">
        <RenderComponentStyles />
      </ExpandableSection>

      <ExpandableSection title="Sử dụng Tailwind CSS phổ biến trong dự án">
        <RenderTailwindUsage />
      </ExpandableSection>

      <ExpandableSection title="Các mẫu & Ví dụ (áp dụng cho Material Design Components)">
        <RenderPatternsAndExamples />
      </ExpandableSection>

      <ExpandableSection title="Cân nhắc về bố cục & phản hồi (Responsive & Layout Considerations)">
        <RenderResponsiveLayout />
      </ExpandableSection>

      <ExpandableSection title="Ghi chú về khả năng tiếp cận (Accessibility Notes)">
        <RenderAccessibilityNotes />
      </ExpandableSection>

      <ExpandableSection title="Danh sách kiểm tra triển khai (Implementation Checklist)">
        <RenderImplementationChecklist />
      </ExpandableSection>

      <ExpandableSection title="Phụ lục — CSS Variable Starter (từ globals.css)">
        <RenderCssVariableStarter />
      </ExpandableSection>

      <ExpandableSection title="Trình bày Font (Font Showcase)">
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