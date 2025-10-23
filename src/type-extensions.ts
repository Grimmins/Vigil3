import "hardhat/types/runtime";
import "hardhat/types/config";

declare module "hardhat/types/runtime" {
  export interface HardhatRuntimeEnvironment {
    vigil3: {
      sayHello(): void;
    };
  }
}

declare module "hardhat/types/config" {
  export interface HardhatUserConfig {
    vigil3?: {
      blockOnSeverities?: ("High" | "Medium" | "Low" | "Informational" | "Optimization")[];
    };
  }

  export interface HardhatConfig {
    vigil3: {
      blockOnSeverities: ("High" | "Medium" | "Low" | "Informational" | "Optimization")[];
    };
  }
}
