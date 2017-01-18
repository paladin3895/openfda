'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable(
      'substance',
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV1,
          primaryKey: true,
        },
        drugId: {
          type: Sequelize.UUID,
          allowNull: true,
          references: {
            model: 'drug',
            key: 'id',
          }
        },
        substance: {
          type: Sequelize.STRING,
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
    return queryInterface.dropTable('substance');
  }
};
