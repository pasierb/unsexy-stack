export default {
  apps: [
    {
      name: "unsexy-stack",
      watch: false,
      script: "./server/index.mjs",
      env: {
        NODE_ENV: "production",
      },
      instances: 1,
    },
  ],
};
