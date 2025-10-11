import "hardhat/types/runtime";

declare module "hardhat/types/runtime" {
  export interface HardhatRuntimeEnvironment {
    LintKey: {
      sayHello(): void;
    };
  }
}
