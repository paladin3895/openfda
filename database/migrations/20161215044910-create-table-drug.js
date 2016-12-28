'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable(
      'drug',
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV1,
          primaryKey: true,
        },
        reportId: {
          type: Sequelize.UUID,
          references: {
            model: 'report',
            key: 'id',
          }
        },
        indication: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        medicinalProduct: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        administrationRoute: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        dosageForm: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        dosageText: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        structureDosageUnit: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        structureDosageNumber: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        characterization: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        actionDrug: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        activeSubstance: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        openfda: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        additional: {
          type: Sequelize.TEXT,
          allowNull: true,
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
    return queryInterface.dropTable('drug');
  }
};
