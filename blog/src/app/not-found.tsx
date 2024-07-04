import Link from "next/link";

export default async function NotFound() {
  return (
    <div className="w-screen h-full flex items-center justify-center bg-black text-white">
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </div>
  );
}
