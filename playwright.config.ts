import { defineConfig } from "@playwright/test";

const baseURL = `http://127.0.0.1:3000`;
export default defineConfig({
  testDir: "e2e",
  retries: 2,
  webServer: {
    command: "pnpm dev", // has to be pnpm build && pnpm start for production.
    port: 3000,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },
  use: {
    baseURL,
  },
  // projects: [
  //   {
  //     name: "Desktop Chrome",
  //     use: {
  //       ...devices["Desktop Chrome"],
  //     },
  //   },
  //   {
  //     name: "Desktop Safari",
  //     use: {
  //       ...devices["Desktop Safari"],
  //     },
  //   },
  //   {
  //     name: "Mobile Chrome",
  //     use: {
  //       ...devices["Pixel 5"],
  //     },
  //   },
  //   {
  //     name: "Mobile Safari",
  //     use: devices["iPhone 12"],
  //   },
  // ],
});
