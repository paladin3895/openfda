import _ from 'lodash';
import uuid from 'uuid';

export function mapDataToModels({ patient, ...report }) {
  const { drug: drugs, reaction: reactions } = patient;
  const {
    reporttype,
    occurcountry,
    safetyreportid,
    safetyreportversion,
    serious,
    // ...additional
  } = report;
  const id = uuid.v1();

  return {
    id,
    type: reporttype,
    country: occurcountry,
    safetyReportId: safetyreportid,
    safetyReportVersion: safetyreportversion,
    serious,
    // additional,
    patient: { ...mapPatientData(patient), reportId: id },
    drugs: drugs.map(drug => ({ ...mapDrugData(drug), reportId: id })),
    reactions: reactions.map(reaction => ({ ...mapReactionData(reaction), reportId: id })),
  };
}

export function mapPatientData({
  patientonsetage,
  patientonsetageunit,
  patientagegroup,
  patientsex
}) {
  return {
    id: uuid.v1(),
    onsetAge: patientonsetage,
    onsetAgeUnit: patientonsetageunit,
    onsetAgeGroup: patientagegroup,
    sex: patientsex,
  };
}

export function mapDrugData({
  drugindication,
  medicinalproduct,
  drugadministrationroute,
  drugcharacterization,
  // drugstructuredosagenumb,
  // drugstructuredosageunit,
  drugdosageform,
  drugdosagetext,
  actiondrug,
  openfda,
  activesubstance,
  // ...additional
}) {
  const id = uuid.v1();
  return {
    id,
    indication: drugindication,
    medicinalProduct: medicinalproduct,
    administrationRoute: drugadministrationroute,
    characterization: drugcharacterization,
    // structureDosageUnit: drugstructuredosageunit,
    // structureDosageNumber: drugstructuredosagenumb,
    dosageForm: drugdosageform,
    dosageText: drugdosagetext,
    actionDrug: actiondrug,
    openfda: _.isObject(openfda) ? openfda.spl_id : null,
    // additional: additional,
    substances: (typeof activesubstance !== 'undefined') ?
      mapSubstanceData(activesubstance.activesubstancename)
        .map(substance => ({ ...substance, drugId: id }))
      : [],
  };
}

export function mapReactionData({ reactionoutcome, reactionmeddrapt, reactionmeddraversionpt }) {
  return {
    id: uuid.v1(),
    reactionOutcome: reactionoutcome,
    reactionName: reactionmeddrapt,
    reactionVersion: reactionmeddraversionpt,
  };
}

export function mapSubstanceData(substanceNames) {
  return substanceNames
    .split('\\')
    .map(substanceName => ({
      id: uuid.v1(),
      substance: substanceName,
    }));
}
