const withTM = require("next-transpile-modules")(["langchain"]);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    customServer: true,
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.experiments = {
      ...config.experiments,
      syncWebAssembly: true,
    };

    return config;
  },
};

module.exports = withTM(nextConfig);
