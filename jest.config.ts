import type { Config } from "@jest/types";

// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
  reporters: ["default", "jest-junit"],
  // setupFilesAfterEnv: ['./tests/bootstrap.ts']
};
export default config;
