import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    experimentalModifyObstructiveThirdPartyCode: true,
    env: {
      googleTestUsername: process.env.GOOGLE_USERNAME,
      googleTestPassword: process.env.GOOGLE_PASSWORD,
      host: process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'
    },
  }
});
