import fs from 'fs';
import path from 'path';
import wait from 'wait.for';

import { Report, Patient, Drug, Reaction } from './models';
import { mapDataToModels } from './helper';

const dataDir = path.join(__dirname, '../data');
const resources = JSON.parse(fs.readFileSync(path.join(__dirname, '../resources.mockup.json')));
// const url = resources.shift();

resources.forEach((url) => {
  const filename = url.split('/').pop().replace('.zip', '');
  const data = JSON.parse(fs.readFileSync(path.join(dataDir, filename)));
  wait.launchFiber(() => {
    data.results.forEach((report) => {
      wait.forMethod(Report, 'create',
      mapDataToModels(report),
        {
          include: [
            { model: Patient, as: 'patient' },
            { model: Drug, as: 'drugs' },
            { model: Reaction, as: 'reactions' },
          ]
        });
    });
  });
});
