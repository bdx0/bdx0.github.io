import type { Metadata } from "next";
import TianjiaEmbed from "./TianjiaEmbed";

export const metadata: Metadata = {
  title: "TIANJIA-01",
  description: "3D mecha model observatory inside BDX0 Apps.",
};

export default function TianjiaAppPage() {
  return <TianjiaEmbed />;
}
