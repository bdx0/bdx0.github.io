import type { Metadata } from "next";

import DauThauEmbed from "./DauThauEmbed";

export const metadata: Metadata = {
  title: "Đấu Thầu 360",
  description: "Workspace tra cứu pháp luật và xử lý nghiệp vụ đấu thầu Việt Nam.",
};

export default function DauThauAppPage() {
  return <DauThauEmbed />;
}
