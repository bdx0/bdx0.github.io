import nextMDX from "@next/mdx";
const withMDX = nextMDX({
    extension: /\.mdx?$/,
    options: {},
});
/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    distDir: "out", // change the output directory `out` -> `out`
    pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
    images: {
        unoptimized: true,
        dangerouslyAllowSVG: true,
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    },
    reactStrictMode: true,
};

export default withMDX(nextConfig);
