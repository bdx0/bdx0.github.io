"use client";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin", "vietnamese"] });

type Props = React.PropsWithChildren<{}>;

const BlogLayout = ({ children }: Props) => {
  return (
    <div className={inter.className}>
      <h1>Header</h1>
      <div className="container">{children}</div>
    </div>
  );
};

export default BlogLayout;
