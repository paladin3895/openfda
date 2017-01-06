/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('patient', {
    id: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      primaryKey: true
    },
    reportId: {
      type: DataTypes.CHAR(36),
      allowNull: true,
      references: {
        model: 'report',
        key: 'id'
      }
    },
    onsetAge: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    onsetAgeUnit: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    onsetAgeGroup: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    sex: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'patient',
    timestamps: false,
  });
};
