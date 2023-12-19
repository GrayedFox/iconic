import "dotenv/config";

import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    testIsolation: false,
    supportFile: false,
    viewportHeight: 800,
    viewportWidth: 1200,
    setupNodeEvents(on, config) {
      // we are relying on dotenv but just in case people want to use a Cypress env config too
      config.env = config.env || {};
      config.env = { ...config.env, ...process.env };
      return config;
    },
  },
});
