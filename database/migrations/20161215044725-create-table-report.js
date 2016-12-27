'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable(
      'report',
      {
        uuid: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV1,
          primaryKey: true,
        },
        type: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        country: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        safetyReportId: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        serious: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        receiveDate: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        transmissionDate: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        createdAt: {
          type: Sequelize.DATE
        },
        updatedAt: {
          type: Sequelize.DATE
        },
        deletedAt: {
          type: Sequelize.DATE,
          defaultValue: null,
          allowNull: true
        },
      },
      {
        engine: 'InnoDB',                     // default: 'InnoDB'
        charset: 'utf8',                    // default: null
        // schema: 'public',
      }
    );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('report');
  }
};
