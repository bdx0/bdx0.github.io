import type { Metadata } from "next";

import YiJingEmbed from "./YiJingEmbed";

export const metadata: Metadata = {
  title: "Kinh Dịch",
  description: "Kinh Dịch mở bên trong BDX0 Apps.",
};

export default function YiJingAppPage() {
  return <YiJingEmbed />;
}
