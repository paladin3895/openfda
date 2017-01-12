import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const resources = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'resources.json')));

resources.forEach((url) => {
  const filename = url.split('/').slice(-2).join('-').replace('.zip', '');
  console.log(`...Chunking ${filename}...`);
  execSync(`node ${path.join(__dirname, 'chunkFile.js')} ${filename}`);
});
