const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const srcDir = path.join(process.cwd(), "src");
const radixImports = new Set();

function scanDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      scanDir(fullPath);
    } else if (file.endsWith(".tsx") || file.endsWith(".ts")) {
      const content = fs.readFileSync(fullPath, "utf8");
      const matches = content.match(/@radix-ui\/[a-z0-9\-]+/gi);
      if (matches) matches.forEach((m) => radixImports.add(m));
    }
  }
}

// Scan src folder for Radix UI imports
scanDir(srcDir);

if (radixImports.size === 0) {
  console.log("No @radix-ui imports found.");
  process.exit(0);
}

console.log("Found Radix UI packages:", [...radixImports].join(", "));

const packagesToInstall = [];

for (const pkg of radixImports) {
  try {
    execSync(`npm view ${pkg} version`, { stdio: "ignore" });
    packagesToInstall.push(pkg);
  } catch (err) {
    console.warn(`Skipping invalid package: ${pkg}`);
  }
}

if (packagesToInstall.length === 0) {
  console.log("No valid Radix UI packages to install.");
  process.exit(0);
}

console.log("Installing valid packages:", packagesToInstall.join(", "));
execSync(`npm install ${packagesToInstall.join(" ")}`, { stdio: "inherit" });
console.log("Done! Radix UI packages installed.");
