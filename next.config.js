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
  output: 'export',
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  transpilePackages: ['next-mdx-remote'],
  experimental: {
  },
}

module.exports = withMDX(nextConfig)
