// install-valid-radix-packages.cjs
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Folder to scan
const SRC_DIR = path.join(__dirname, 'src');

// Regex to find Radix imports
const RADIX_IMPORT_REGEX = /@radix-ui\/[a-z0-9-]+/gi;

// Known invalid / removed packages to skip
const INVALID_PACKAGES = new Set(['@radix-ui/react-sheet']);

const packages = new Set();

// Recursively scan folder for .ts/.tsx/.js/.jsx files
function scanDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanDir(fullPath);
    } else if (/\.(ts|tsx|js|jsx)$/.test(entry.name)) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const matches = content.match(RADIX_IMPORT_REGEX);
      if (matches) {
        matches.forEach((pkg) => {
          if (!INVALID_PACKAGES.has(pkg)) packages.add(pkg);
        });
      }
    }
  }
}

// Scan project
scanDir(SRC_DIR);

if (packages.size === 0) {
  console.log('No Radix UI imports found in src folder.');
  process.exit(0);
}

// Convert set to array
const pkgList = Array.from(packages);
console.log('Installing Radix packages:', pkgList.join(', '));

try {
  execSync(`npm install ${pkgList.join(' ')}`, { stdio: 'inherit' });
  console.log('✅ Radix packages installed successfully.');
} catch (err) {
  console.error('❌ Error installing Radix packages:', err.message);
}
