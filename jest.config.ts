import type { Config } from "@jest/types";

// Sync object
const config: Config.InitialOptions = {
  // setupFilesAfterEnv: ['./tests/bootstrap.ts']
  verbose: true,
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
  reporters: ["default", "buildkite-test-collector/jest/reporter"],

  // Enable column + line capture for Test Analytics
  testLocationInResults: true,
};
export default config;
