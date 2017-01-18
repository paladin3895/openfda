import { expect } from 'chai';
import fs from 'fs';
import path from 'path';

import { mapDataToModels } from '../src/helper';

const sample = JSON.parse(fs.readFileSync(path.join(__dirname, 'sample.json')));

describe('Helper functions', () => {
  it('should map data to model correctly', () => {
    const { results: reports } = sample;
    const reportModel = mapDataToModels(reports[0]);

    expect(reportModel)
      .is.an('object')
      .that.has.keys(
        'id', 'type', 'country',
        'safetyReportId', 'safetyReportVersion',
        'serious', 'additional',
        'patient', 'drugs', 'reactions');

    expect(reportModel.patient)
      .is.an('object')
      .that.has.keys('id', 'reportId', 'onsetAge', 'onsetAgeUnit', 'onsetAgeGroup', 'sex');

    expect(reportModel.drugs)
      .is.an('array')
      .that.has.lengthOf(1);

    reportModel.drugs.forEach((drug) => {
      expect(drug)
        .is.an('object')
        .that.has.property('substances')
        .to.be.an('array');
    });

    expect(reportModel.reactions)
      .is.an('array')
      .that.has.lengthOf(4);
  })
});
