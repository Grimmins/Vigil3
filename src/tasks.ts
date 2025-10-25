import {subtask, task} from "hardhat/config";
import { runSlither } from "./slither-runner";
import {TASK_COMPILE} from "hardhat/builtin-tasks/task-names";
import {enforceVulnerabilitiesGuard} from "./guard";

task("v3", "vigil3 is up :)").setAction(async (_, hre) => {
  hre.vigil3.sayHello();
});

task("vigil3", "analysis of a Solidity file with Slither")
  .addPositionalParam("file", "path of solidity file to analyze")
  .setAction(async (taskArgs) => {
    const reportPath = runSlither(taskArgs.file);
  });

subtask(TASK_COMPILE, "Compile + vigil3 guard")
  .setAction(async (args, hre, runSuper) => {
    await runSuper(args); // compile d’abord
    // enforcement après compile
    await enforceVulnerabilitiesGuard(process.cwd(), hre.config as any);
  });