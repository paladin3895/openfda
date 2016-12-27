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
        startDate: {
          type: Sequelize.DATE,
          allowNull: true,
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
          get: function()  {
            return JSON.parse(this.getDataValue('activeSubstance'));
          },
          set: function(val) {
            this.setDataValue('activeSubstance', JSON.stringify(val);
          }
        },
        openfda: {
          type: Sequelize.TEXT,
          allowNull: true,
          get: function()  {
            return JSON.parse(this.getDataValue('openfda'));
          },
          set: function(val) {
            this.setDataValue('openfda', JSON.stringify(val);
          }
        },
        additional: {
          type: Sequelize.TEXT,
          allowNull: true,
          get: function()  {
            return JSON.parse(this.getDataValue('additional'));
          },
          set: function(val) {
            this.setDataValue('additional', JSON.stringify(val);
          }
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
