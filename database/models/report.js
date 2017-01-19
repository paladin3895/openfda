/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('report', {
    id: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      primaryKey: true
    },
    type: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    country: {
      type: DataTypes.STRING,
      allowNull: true
    },
    safetyReportId: {
      type: DataTypes.STRING,
      allowNull: true
    },
    serious: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    // additional: {
    //   type: DataTypes.TEXT,
    //   allowNull: true,
    //   get: function()  {
    //     return JSON.parse(this.getDataValue('additional'));
    //   },
    //   set: function(val) {
    //     this.setDataValue('additional', JSON.stringify(val));
    //   }
    // },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'report'
  });
};
