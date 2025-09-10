/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config, options) {
    // Find the existing rule handling SVGs and exclude SVG from it
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.('.svg')
    );
    fileLoaderRule.exclude = /\.svg$/i;

    // Add a new rule for SVGs to use @svgr/webpack
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      resourceQuery: { not: [/url/] }, // `?url` keeps raw file import
      use: [{
        loader: '@svgr/webpack',
        options: {
          icon: true,
          svgo: true,
          svgoConfig: {
            plugins: [
              { name: 'removeDimensions', active: true },
              { name: 'removeViewBox', active: false },
            ],
          },
          replaceAttrValues: { '#000': 'currentColor', '#111': 'currentColor', '#fff': 'currentColor' },
        },
      }],
    });

    return config;
  },
};

export default nextConfig;
