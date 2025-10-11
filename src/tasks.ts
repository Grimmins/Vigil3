import { task } from "hardhat/config";

task("hello", "Affiche un message du plugin").setAction(async (_, hre) => {
  hre.LintKey.sayHello();
});
