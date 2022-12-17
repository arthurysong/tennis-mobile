module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "module:react-native-dotenv",
      [
        "module-resolver",
        {
          alias: {
            Components: "./src/components",
            Constants: "./src/constants",
            Hooks: "./src/hooks",
            Assets: "./assets",
            Recoil: "./src/recoil",
            Helpers: "./src/helpers",
            Utils: "./src/components/utils",
          },
        },
      ],
    ],
  };
};
