import fs from 'fs';
import { EOL } from 'os';
import path from 'path';
import zlib from 'zlib';
import uuid from 'uuid';
import JSONStream from 'JSONStream';

const dataDir = path.join(__dirname, '..', 'data');
const chunkDir = path.join(dataDir, 'chunks');

if (!fs.existsSync(chunkDir)) {
  fs.mkdirSync(chunkDir);
}

const resource = path.join(dataDir, process.argv[2]);
if (!fs.existsSync(resource)) { process.exit(); }

process.stdout.write(`Processing file ${resource}${EOL}`);
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
    list = [];
  }
});
readStream.pipe(parser);
