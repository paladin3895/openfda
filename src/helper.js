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
    ...additional
  } = report;

  return {
    id: uuid.v1(),
    type: reporttype,
    country: occurcountry,
    safetyReportId: safetyreportid,
    safetyReportVersion: safetyreportversion,
    serious,
    additional,
    patient: mapPatientData(patient),
    drugs: drugs.map(drug => mapDrugData(drug)),
    reactions: reactions.map(reaction => mapReactionData(reaction)),
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
  drugstructuredosagenumb,
  drugstructuredosageunit,
  drugdossageform,
  drugdosagetext,
  actiondrug,
  openfda,
  activesubstance,
  ...additional
}) {
  return {
    id: uuid.v1(),
    indication: drugindication,
    medicinalProduct: medicinalproduct,
    administrationRoute: drugadministrationroute,
    characterization: drugcharacterization,
    structureDosageUnit: drugstructuredosageunit,
    structureDosageNumber: drugstructuredosagenumb,
    dossageForm: drugdossageform,
    dosageText: drugdosagetext,
    actionDrug: actiondrug,
    openfda: _.isObject(openfda) ? openfda.spl_id : null,
    activeSubstance: activesubstance,
    additional,
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
