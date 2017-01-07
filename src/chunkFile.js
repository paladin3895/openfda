import fs from 'fs';
import { EOL } from 'os';
import path from 'path';
import zlib from 'zlib';
import uuid from 'uuid';
import JSONStream from 'JSONStream';

const dataDir = path.join(__dirname, '..', 'data');
const chunkDir = path.join(dataDir, 'chunks');
const resources = JSON.parse(fs.readFileSync(path.join(__dirname, '../resources.mockup.json')));

if (!fs.existsSync(chunkDir)) {
  fs.mkdirSync(chunkDir);
}

resources.forEach((url) => {
  const resource = path.join(dataDir, url.split('/').pop().replace('.zip', ''));
  const readStream = fs.createReadStream(resource);
  readStream.on('end', () => {
    fs.unlink(resource);
  });

  const limit = 1000;
  let length = 1000000;
  let count = 0;
  let list = [];
  let filename;

  const parser = JSONStream.parse(['results', true]);

  parser.on('header', (header) => {
    length = header.meta.results.limit;
  });

  parser.on('data', (report) => {
    if (count % limit === 0) {
      filename = path.join(chunkDir, uuid.v1());
      process.stdout.write('.');
    }
    list.push(report);
    count += 1;
    if ((count % limit === limit - 1) || (count === length)) {
      fs.writeFileSync(filename, zlib.gzipSync(JSON.stringify(list)));
      fs.appendFile(path.join(chunkDir, 'index'), `${filename}${EOL}`);
      list = [];
    }
  });
  readStream.pipe(parser);
});
