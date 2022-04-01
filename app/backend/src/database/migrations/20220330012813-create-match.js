'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('matchs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      homeTeam: {
        type: Sequelize.INTEGER,
        field: 'home_team',
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: {
          model: {
            tableName: "clubs",
          },
        },
        allowNull: false,
      },
      homeTeamGoals: {
        type: Sequelize.INTEGER,
        field: 'home_team_goals',
        allowNull: false,
      },
      awayTeam: {
        type: Sequelize.INTEGER,
        field: 'away_team',
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: {
          model: {
            tableName: "clubs",
          },
        },
        allowNull: false,
      },
      awayTeamGoals: {
        field: 'away_team_goals',
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      inProgress: {
        field: 'in_progress',
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
    });
  },
  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('matchs');
  }
};