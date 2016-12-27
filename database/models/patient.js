/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('patient', {
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
      allowNull: false
    }
  }, {
    tableName: 'patient'
  });
};
