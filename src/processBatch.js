import fs from 'fs';
import { EOL } from 'os';
import path from 'path';
import { execSync } from 'child_process';

const dataDir = path.join(__dirname, '..', 'data');
const chunkDir = path.join(dataDir, 'chunks');
const index = fs.readFileSync(path.join(chunkDir, 'index')).toString().split(EOL);

index.forEach((filename) => {
  console.log(`...Processing ${filename}...`);
  execSync(`node ${path.join(__dirname, 'processFile.js')} ${filename}`);
});
