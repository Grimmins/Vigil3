import { spawnSync } from "child_process";
import * as fs from "fs";
import * as path from "path";
import { getSlitherBinaryPath } from "./binaries";

export function runSlither(filePath: string): string {
  const absolutePath = path.resolve(filePath);
  const outputFile = path.join(process.cwd(), "slither-report.json");
  const slitherPath = getSlitherBinaryPath();

  console.log("\x1b[36m%s\x1b[0m", `[vigil3] Analyzing contract: ${absolutePath}`);
  const result = spawnSync(slitherPath, [absolutePath, "--json", outputFile], { stdio: "inherit" });

  if (result.error) throw result.error;
  if (!fs.existsSync(outputFile)) {
    throw new Error("Slither did not generate a report file");
  }

  console.log("\x1b[32m%s\x1b[0m", `[vigil3] Report generated: ${outputFile}`);
  return outputFile;
}

export function readSlitherReport(filePath: string): any {
  const data = fs.readFileSync(filePath, "utf8");
  return JSON.parse(data);
}
