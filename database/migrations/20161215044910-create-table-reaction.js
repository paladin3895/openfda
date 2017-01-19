'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable(
      'reaction',
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
        reactionOutcome: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        reactionVersion: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        reactionName: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        // additional: {
        //   type: Sequelize.TEXT,
        //   allowNull: true,
        // },
      },
      {
        engine: 'InnoDB',                     // default: 'InnoDB'
        charset: 'utf8',                    // default: null
        // schema: 'public',
      }
    );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('reaction');
  }
};
