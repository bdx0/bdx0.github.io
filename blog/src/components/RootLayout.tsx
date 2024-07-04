import VercelSVG from "@/svgs/vercel.svg";
import SearchBar from "./ui/SearchBar";

export default function RootLayout({ children }: React.PropsWithChildren<{}>) {
  return (
    <>
      <nav>
        <VercelSVG className="w-20 h-20 text-white m-4"></VercelSVG>
        <div className="w-full m-8 flex justify-end">
          <div className="w-[30%]">
            <SearchBar></SearchBar>
          </div>
        </div>
      </nav>
      <main>{children}</main>
    </>
  );
}
