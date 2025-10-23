import { subtask } from "hardhat/config";
import { TASK_COMPILE } from "hardhat/builtin-tasks/task-names";
import { enforceVulnerabilitiesGuard } from "./guard";

subtask(TASK_COMPILE, "Compile + vigil3 guard")
  .setAction(async (args, hre, runSuper) => {
    await runSuper(args); // compile d’abord
    // enforcement après compile
    await enforceVulnerabilitiesGuard(process.cwd(), hre.config as any);
  });
