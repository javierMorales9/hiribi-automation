import "reflect-metadata";
import type { Config } from "@jest/types";
import dotenv from "dotenv";
import {container, Lifecycle} from "tsyringe";
import {SequelizeWrapperTest} from "../../src/shared/sequelize/SequelizeWrapperTest";
import SequelizeWrapper from "../../src/shared/sequelize/SequelizeWrapper";
dotenv.config();

container.register<SequelizeWrapper>(
    "SequelizeWrapper",
    {useClass: SequelizeWrapperTest},
    {lifecycle: Lifecycle.Singleton}
);

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