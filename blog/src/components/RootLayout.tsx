import CodingIcon from "@/svgs/coding.svg";
import Link from "next/link";
import BackgroundLayout from "./ui/BackgroundLayer";

export default function RootLayout({ children }: React.PropsWithChildren<{}>) {
  const menu = [
    { name: "bdx0", path: "/about" },
    { name: "notes", path: "./blog" },
    { name: "projects", path: "./projects" },
  ];
  return (
    <div>
      <BackgroundLayout>
        <nav className="">
          <Link href="/">
            <CodingIcon className="logo"></CodingIcon>
          </Link>
          <div className="menu">
            {menu.map((menu) => {
              return (
                <Link href={menu.path} key={menu.path}>
                  <div className="menu_item">
                    <span> {menu.name}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </nav>
        <main className="">{children}</main>
      </BackgroundLayout>
    </div>
  );
}
