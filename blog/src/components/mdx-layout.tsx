export default function MdxLayout({ children }: React.PropsWithChildren<{}>) {
  // Create any shared layout or styles here
  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "2rem 1rem",
      }}
      className="bg-blue-600"
    >
      {children}
    </div>
  );
}
