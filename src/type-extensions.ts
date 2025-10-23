import "hardhat/types/runtime";

declare module "hardhat/types/runtime" {
  export interface HardhatRuntimeEnvironment {
    vigil3: {
      sayHello(): void;
    };
  }
}
