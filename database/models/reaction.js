/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('reaction', {
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
    reactionOutcome: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    reactionVersion: {
      type: DataTypes.STRING,
      allowNull: true
    },
    reactionName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    additional: {
      type: DataTypes.TEXT,
      allowNull: true,
      get: function()  {
        return JSON.parse(this.getDataValue('additional'));
      },
      set: function(val) {
        this.setDataValue('additional', JSON.stringify(val));
      }
    },
  }, {
    tableName: 'reaction'
  });
};
