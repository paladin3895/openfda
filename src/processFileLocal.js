import fs from 'fs';
import path from 'path';
// import os from 'os';
import zlib from 'zlib';
import async from 'async';
// import Promise from 'bluebird';

import { Report, Patient, Drug, Reaction, Substance } from './models';
import { mapDataToModels } from './helper';

// const logFile = path.join(__dirname, '../.log');

require('dotenv').config();

const dataDir = path.join(__dirname, '..', 'data', 'openfda.adr');
const filename = process.argv[2];
const reports = JSON.parse(zlib.unzipSync(fs.readFileSync(path.join(dataDir, filename))));
async.forEach(reports, (report) => {
  Report.create(
    mapDataToModels(report),
    {
      include: [
        { model: Patient, as: 'patient' },
        { model: Reaction, as: 'reactions' },
        { model: Drug, as: 'drugs', include: [{ model: Substance, as: 'substances' }] },
      ],
    }
  );
});
