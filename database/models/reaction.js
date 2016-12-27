/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('reaction', {
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
      allowNull: true
    }
  }, {
    tableName: 'reaction'
  });
};
