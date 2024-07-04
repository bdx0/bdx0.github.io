import CodingIcon from "@/svgs/coding.svg?url";
import Image from "next/image";
import Link from "next/link";

export default function RootLayout({ children }: React.PropsWithChildren<{}>) {
  const menu = [
    { name: "bdx0", path: "/about" },
    { name: "notes", path: "./blog" },
    { name: "projects", path: "./projects" },
  ];
  return (
    <>
      <nav className="">
        <Link href="/" className="mx-4 my-2">
          <Image src={CodingIcon} className="logo" alt="logo"></Image>
        </Link>
        <div className="flex px-8">
          {menu.map((menu) => {
            return (
              <Link href={menu.path} key={menu.path}>
                <div className="m-4 text-xl">{menu.name}</div>
              </Link>
            );
          })}
        </div>
      </nav>
      <main>{children}</main>
    </>
  );
}
