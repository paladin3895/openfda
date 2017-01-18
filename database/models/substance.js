/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('substance', {
    id: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      primaryKey: true,
    },
    drugId: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      references: {
        model: 'drug',
        key: 'id'
      }
    },
    substance: {
      type: DataTypes.STRING,
      allowNull: true
    },
  }, {
    tableName: 'substance',
    timestamps: false,
  });
};
