import fs from 'fs';
import os from 'os';
import path from 'path';
import uuid from 'uuid';
import _ from 'lodash';

const dataDir = path.join(__dirname, '../data');
const chunkDir = path.join(dataDir, 'chunks');
const resources = JSON.parse(fs.readFileSync(path.join(__dirname, '../resources.mockup.json')));
const limit = 1000;

if (!fs.existsSync(chunkDir)) {
  fs.mkdirSync(chunkDir);
}

resources.forEach((url) => {
  const filename = url.split('/').pop().replace('.zip', '');
  const data = JSON.parse(fs.readFileSync(path.join(dataDir, filename)));
  const length = data.results.length;

  _.range(0, length, limit)
   .forEach(() => {
     const chunkName = uuid.v1();
     fs.appendFile(path.join(chunkDir, 'index'), `${chunkName}${os.EOL}`);
     fs.writeFileSync(
       path.join(chunkDir, chunkName),
       JSON.stringify(data.results.splice(0, limit)));
   });
});
