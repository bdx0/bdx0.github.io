const createMDX = require('@next/mdx')

const withMDX = createMDX({
  // Add markdown plugins here, if desired
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
}

module.exports = withMDX(nextConfig)
