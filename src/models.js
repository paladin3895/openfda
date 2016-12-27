import { report, patient, drug, reaction } from '../database/models';

report.hasOne(patient, {
  foreignKey: 'reportId',
  as: 'patient',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

patient.belongsTo(report, {
  foreignKey: 'reportId',
  as: 'report',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

report.hasMany(drug, {
  foreignKey: 'reportId',
  as: 'drugs',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

drug.belongsTo(report, {
  foreignKey: 'reportId',
  as: 'report',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

report.hasMany(reaction, {
  foreignKey: 'reportId',
  as: 'reactions',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

reaction.belongsTo(report, {
  foreignKey: 'reportId',
  as: 'report',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

export default {
  Report: report,
  Patient: patient,
  Drug: drug,
  Reaction: reaction,
};
