import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const dataDir = path.join(__dirname, '../data');
const resources = JSON.parse(fs.readFileSync(path.join(__dirname, '../resources.json')));

resources.forEach((url) => {
  console.log(`...Fetching ${url}...`);
  execSync(`./bin/getResource.sh ${url} ${dataDir}`);
});
