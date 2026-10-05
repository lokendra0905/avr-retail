import { execSync } from "child_process";
import fs from "fs";
import os from "os";
import path from "path";

const root = process.cwd();
const outDir = path.join(root, "out");
const htaccessSrc = path.join(root, "deploy", "htaccess");
const zipName = "avrretail-hostinger.zip";
const zipPath = path.join(root, zipName);

console.log("Building static site for Hostinger...\n");
console.log("Tip: Stop 'npm run dev' (Ctrl+C) before building to avoid zip errors.\n");

execSync("npm run prepare-assets", { stdio: "inherit", cwd: root });

execSync("npm run build", {
  stdio: "inherit",
  cwd: root,
  env: { ...process.env, STATIC_EXPORT: "1" },
});

if (!fs.existsSync(outDir)) {
  console.error("Build failed: out/ folder not found.");
  process.exit(1);
}

fs.copyFileSync(htaccessSrc, path.join(outDir, ".htaccess"));

const stagingDir = path.join(os.tmpdir(), `avrretail-deploy-${Date.now()}`);
fs.cpSync(outDir, stagingDir, { recursive: true });

if (fs.existsSync(zipPath)) fs.rmSync(zipPath, { force: true });

function createZip(sourceDir, destination) {
  try {
    execSync(`tar -a -c -f "${destination}" -C "${sourceDir}" .`, { stdio: "inherit" });
    return;
  } catch {
    console.warn("tar zip failed, trying PowerShell...");
  }

  execSync(
    `powershell -NoProfile -Command "Compress-Archive -Path '${sourceDir.replace(/'/g, "''")}\\*' -DestinationPath '${destination.replace(/'/g, "''")}' -Force"`,
    { stdio: "inherit" }
  );
}

try {
  createZip(stagingDir, zipPath);
} catch (error) {
  console.error("\n✗ Zip creation failed:", error.message);
  process.exit(1);
} finally {
  fs.rmSync(stagingDir, { recursive: true, force: true });
}

if (!fs.existsSync(zipPath)) {
  console.error("\n✗ Zip file was not created.");
  console.error("  1. Stop npm run dev (Ctrl+C)");
  console.error("  2. Close any File Explorer window open in the project folder");
  console.error("  3. Run: npm run build:hostinger");
  process.exit(1);
}

const sizeMb = (fs.statSync(zipPath).size / (1024 * 1024)).toFixed(1);
if (Number(sizeMb) < 1) {
  console.error("\n✗ Zip file looks too small — build may have failed.");
  fs.rmSync(zipPath, { force: true });
  process.exit(1);
}

console.log(`\n✓ Deploy package ready: ${zipPath}`);
console.log(`  Size: ${sizeMb} MB`);
console.log("\nUpload to Hostinger:");
console.log("  hPanel → Websites → Manage → File Manager → public_html");
console.log("  Upload this zip → Extract → confirm index.html is in public_html");
