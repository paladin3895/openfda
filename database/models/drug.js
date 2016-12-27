/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('drug', {
    uuid: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      primaryKey: true
    },
    reportUuid: {
      type: DataTypes.CHAR(36),
      allowNull: true,
      references: {
        model: 'report',
        key: 'uuid'
      }
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    indication: {
      type: DataTypes.STRING,
      allowNull: true
    },
    medicinalProduct: {
      type: DataTypes.STRING,
      allowNull: true
    },
    administrationRoute: {
      type: DataTypes.STRING,
      allowNull: true
    },
    dosageForm: {
      type: DataTypes.STRING,
      allowNull: true
    },
    dosageText: {
      type: DataTypes.STRING,
      allowNull: true
    },
    structureDosageUnit: {
      type: DataTypes.STRING,
      allowNull: true
    },
    structureDosageNumber: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    characterization: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    actionDrug: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    activeSubstance: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    openfda: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    additional: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'drug'
  });
};
