const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'src', 'types');
const outDir = path.join(__dirname, '..', 'dist', 'types');

let list = []

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else if (entry.isFile() && entry.name.endsWith('.d.ts')) {
      console.log('Copying', srcPath, 'to', destPath);
      let data = fs.readFileSync(srcPath, 'utf-8');
      data = data.replace(/import\(".*?\/currency"\)/g, 'import("./currency")');
      fs.writeFileSync(destPath, data, 'utf-8');
      list.push(entry.name);
    }
  }
}

copyDir(srcDir, outDir);

const indexPath = path.join(outDir, 'index.d.ts');
let data = fs.readFileSync(indexPath, 'utf-8');
fs.writeFileSync(indexPath, `${list.map(f => `/// <reference path="./${f}" />`).join('\n')}\n\n` + data, 'utf-8');

// console.log(list);
console.log('Copied .d.ts files from', srcDir, 'to', outDir);

