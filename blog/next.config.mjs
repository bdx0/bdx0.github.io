import nextMDX from "@next/mdx";
const withMDX = nextMDX({
    extension: /\.mdx?$/,
    options: {},
});
/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    distDir: "out", // change the output directory `out` -> `out`
    pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
    images: {
        unoptimized: true,
        // dangerouslyAllowSVG: true,
        // contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    },
    reactStrictMode: true,
    webpack(config) {
        // // Grab the existing rule that handles SVG imports
        // // const fileLoaderRule = config.module.rules.find((rule) =>
        // //     rule.test?.test?.('.svg'),
        // // )

        // config.module.rules.push(
        //     // {
        //     //     test: /\.svg$/,
        //     //     issuer: { and: [/\.(js|ts|md)x?$/] },
        //     //     use: [
        //     //         {
        //     //             loader: '@svgr/webpack',
        //     //             options: {
        //     //                 icon: true,
        //     //                 svgoConfig: { plugins: [{ removeViewBox: false }] }
        //     //             }
        //     //         },
        //     //         "url-loader"
        //     //     ],
        //     // },
        //     // Reapply the existing rule, but only for svg imports ending in ?url
        //     // {
        //     //     ...fileLoaderRule,
        //     //     test: /\.svg$/i,
        //     //     resourceQuery: /url/, // *.svg?url
        //     // },
        //     // Convert all other *.svg imports to React components
        //     {
        //         test: /\.svg$/i,
        //         // issuer: /\.(js|ts|md|tsx|jsx|mdx)$/,
        //         issuer: /\.[jt]sx$/,
        //         resourceQuery: { not: /url/ }, // exclude if *.svg?url
        //         use: ['@svgr/webpack', 'url-loader'],
        //     },
        //     {
        //         test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        //         loader: 'url-loader',
        //     },
        // );

        // // Modify the file loader rule to ignore *.svg, since we have it handled now.
        // // fileLoaderRule.exclude = /\.svg$/i

        // return config;
        // Grab the existing rule that handles SVG imports
        const fileLoaderRule = config.module.rules.find((rule) =>
            rule.test?.test?.('.svg'),
        )

        config.module.rules.push(
            // Reapply the existing rule, but only for svg imports ending in ?url
            {
                ...fileLoaderRule,
                test: /\.svg$/i,
                resourceQuery: /url/, // *.svg?url
            },
            // Convert all other *.svg imports to React components
            {
                test: /\.svg$/i,
                issuer: fileLoaderRule.issuer,
                resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
                use: ['@svgr/webpack'],
            },
        )

        // Modify the file loader rule to ignore *.svg, since we have it handled now.
        fileLoaderRule.exclude = /\.svg$/i

        return config
    },
};

export default withMDX(nextConfig);
