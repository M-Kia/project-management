module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.module.rules.map((rule) => console.log(JSON.stringify(rule)));
    config.typescript.tsconfigPath = "./tsconfig.json"
    return config;
  },
};
