import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    experimentalModifyObstructiveThirdPartyCode: true,
    env: {
      googleTestUsername: process.env.GOOGLE_USERNAME,
      googleTestPassword: process.env.GOOGLE_PASSWORD
    }
  },
});
