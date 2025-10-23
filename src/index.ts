import { extendEnvironment } from "hardhat/config";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import "./tasks";
import "./type-extensions";

extendEnvironment((hre: HardhatRuntimeEnvironment) => {
  hre.vigil3 = {
    sayHello() {
      console.log("Hello World !");
    },
  };
});
