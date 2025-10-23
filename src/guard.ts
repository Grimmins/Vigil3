import { readSlitherReport, runSlither } from "./slither-runner";
import * as fs from "fs";
import * as path from "path";

type Severity = "High" | "Medium" | "Low" | "Informational" | "Optimization";

export async function enforceVulnerabilitiesGuard(projectRoot: string, cfg: any) {
  const blockOn: Severity[] = cfg?.vigil3?.blockOnSeverities ?? ["High", "Medium"];

  // Simple: scanner tous les .sol de /contracts
  const contractsDir = path.join(projectRoot, "contracts");
  if (!fs.existsSync(contractsDir)) return;

  const solidityFiles = fs.readdirSync(contractsDir)
    .filter(f => f.endsWith(".sol"))
    .map(f => path.join(contractsDir, f));

  let blocked: { file: string; findings: any[] }[] = [];

  for (const file of solidityFiles) {
    const reportPath = runSlither(file);
    const report = readSlitherReport(reportPath);

    const findings = (report?.results?.detectors ?? []).filter((d: any) =>
      blockOn.includes(d.impact as Severity)
    );

    if (findings.length > 0) {
      blocked.push({ file, findings });
    }
  }

  if (blocked.length > 0) {
    console.error("\n\x1b[31m[vigil3] Vulnerabilities detected. Blocking deployment.\x1b[0m");
    for (const b of blocked) {
      console.error(`\nFile: ${b.file}`);
      for (const f of b.findings) {
        console.error(`- [${f.impact}] ${f.check}: ${f.description}`);
      }
    }
    throw new Error("[vigil3] Deployment blocked due to Slither findings");
  }
}
