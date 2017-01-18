'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable(
      'patient',
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV1,
          primaryKey: true,
        },
        reportId: {
          type: Sequelize.UUID,
          allowNull: true,
          references: {
            model: 'report',
            key: 'id',
          }
        },
        onsetAge: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        onsetAgeUnit: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        onsetAgeGroup: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        sex: {
          type: Sequelize.INTEGER,
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
    return queryInterface.dropTable('patient');
  }
};
