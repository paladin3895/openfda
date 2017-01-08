import fs from 'fs';
import path from 'path';
import os from 'os';
import zlib from 'zlib';

import { Report, Patient, Drug, Reaction } from './models';
import { mapDataToModels } from './helper';

const logFile = path.join(__dirname, '../.log');
const chunkDir = path.join(__dirname, '..', 'data', 'chunks');

const filenames = fs.readFileSync(path.join(chunkDir, 'index')).toString().split(os.EOL);

console.log(`Total file: ${filenames.length}`);

const filename = filenames.shift();
if (!filename) { process.exit(); }

console.log(`Processing filename: ${filename}`);

fs.writeFileSync(path.join(chunkDir, 'index'), filenames.join(os.EOL));

const data = JSON.parse(
  zlib.unzipSync(fs.readFileSync(filename)));

data.forEach((report) => {
  Report
    .findOne({ where: { safetyReportId: report.safetyreportid } })
    .then((result) => {
      if (result) { return; }
      return Report.create(
        mapDataToModels(report),
        {
          include: [
            { model: Patient, as: 'patient' },
            { model: Drug, as: 'drugs' },
            { model: Reaction, as: 'reactions' },
          ]
        })
    })
    .catch(({ name, message }) => fs.appendFile(logFile, `${name}: ${message}${os.EOL}`));
});
