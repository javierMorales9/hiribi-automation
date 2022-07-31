import type { Config } from "@jest/types";
import dotenv from "dotenv";
dotenv.config();


// Sync object
const config: Config.InitialOptions = {
    preset: "ts-jest",
    moduleFileExtensions: ["js", "json", "ts"],
    rootDir: ".",
    testEnvironment: "node",
    testRegex: ".int-test.ts$",
    transform: {
        "^.+\\.(t|j)s$": "ts-jest",
    },
    testTimeout: 30000,
};

export default config;