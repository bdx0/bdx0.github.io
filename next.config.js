const createMDX = require('@next/mdx');

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    // Note: We're not adding remark/rehype plugins directly here to avoid serialization issues
    // Instead, we'll handle MDX processing through other means
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Comment out output: 'export' for development (add back for static export)
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  transpilePackages: ['next-mdx-remote'],
  experimental: {
    turbopack: false, // Explicitly disable Turbopack
  },
}

module.exports = withMDX(nextConfig)
