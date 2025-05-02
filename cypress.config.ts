import { defineConfig } from "cypress";
import dotenv from 'dotenv';
dotenv.config();


export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('@cypress/grep/src/plugin')(config);
      return config;
    },
    experimentalModifyObstructiveThirdPartyCode: true,
    env: {
      host: process.env.HOST || 'http://localhost:3000/',
      googleTestUsername: process.env.GOOGLE_TEST_USERNAME,
      googleTestPassword: process.env.GOOGLE_TEST_PASSWORD
    }
  }
});
