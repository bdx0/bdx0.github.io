import Link from 'next/link';

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <nav className="flex border-b mb-4">
        <Link href="/about" className="py-2 px-4 hover:bg-gray-100">Resume</Link>
        <Link href="/about/me" className="py-2 px-4 hover:bg-gray-100">About Me</Link>
        <Link href="/about/projects" className="py-2 px-4 hover:bg-gray-100">Projects</Link>
      </nav>
      <article className="prose lg:prose-xl">{children}</article>
    </div>
  );
}
