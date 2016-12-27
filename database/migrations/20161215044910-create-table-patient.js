'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable(
      'patient',
      {
        uuid: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV1,
          primaryKey: true,
        },
        reportUuid: {
          type: Sequelize.UUID,
          references: {
            model: 'report',
            key: 'uuid',
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
          allowNull: false,
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
