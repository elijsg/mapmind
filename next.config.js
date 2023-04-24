const withTM = require("next-transpile-modules")(["langchain"]);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Enable WebAssembly support
    config.experiments = {
      ...config.experiments,
      syncWebAssembly: true,
    };

    return config;
  },
};

module.exports = withTM(nextConfig);