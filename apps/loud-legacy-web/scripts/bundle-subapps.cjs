#!/usr/bin/env node
/*
  Bundles sub-app static outputs into the landing site's `out/` folder
  so paths like /valora, /venuevr, /business-now, /diy work without env.
*/
const { execSync } = require('node:child_process');
const { existsSync, mkdirSync, cpSync } = require('node:fs');
const { join } = require('node:path');

const root = join(__dirname, '..', '..'); // apps/
const landingOut = join(__dirname, '..', 'out');

function run(cmd, cwd) {
  execSync(cmd, { stdio: 'inherit', cwd });
}

// Build Valora (Vite) and copy to /out/valora
const valoraDir = join(root, 'valora-web');
if (existsSync(valoraDir)) {
  run('npm ci', valoraDir);
  run('npm run build', valoraDir);
  const src = join(valoraDir, 'dist');
  const dest = join(__dirname, '..', 'out', 'valora');
  mkdirSync(dest, { recursive: true });
  cpSync(src, dest, { recursive: true });
}

// Helper to build Next.js subapps and copy their `out/`
function buildNextSub(appName, targetPathName) {
  const dir = join(root, appName);
  if (!existsSync(dir)) return;
  run('npm install', dir);
  run('npm run build', dir); // build then export per package.json
  const src = join(dir, 'out');
  const dest = join(landingOut, targetPathName);
  mkdirSync(dest, { recursive: true });
  cpSync(src, dest, { recursive: true });
}

buildNextSub('hub-web', 'hub');
buildNextSub('business-now-web', 'business-now');
buildNextSub('legacy-crm-web', 'crm');
buildNextSub('venuevr-web', 'venuevr');

console.log('Sub-apps bundled into out/');

