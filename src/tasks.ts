import { task } from "hardhat/config";
import { runSlither } from "./slither-runner";

task("hello", "hello from plugin :)").setAction(async (_, hre) => {
  hre.LintKey.sayHello();
});

task("lintkey", "analysis of a Solidity file with Slither")
  .addPositionalParam("file", "path of solidity file to analyze")
  .setAction(async (taskArgs) => {
    const reportPath = runSlither(taskArgs.file);
  });

