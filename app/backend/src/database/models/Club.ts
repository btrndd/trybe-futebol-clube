import { Model, DataTypes } from 'sequelize';
import db from '.';
import Match from './Match';

class Club extends Model {
  id: number;

  clubName: string;
}

Club.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    clubName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    underscored: true,
    sequelize: db,
    modelName: 'Club',
    tableName: 'clubs',
    timestamps: false,
  },
);

Club.hasMany(Match, { foreignKey: 'homeTeam', as: 'homeClub' });
Club.hasMany(Match, { foreignKey: 'awayTeam', as: 'awayClub' });

Match.belongsTo(Club, { foreignKey: 'homeTeam', as: 'homeClub' });
Match.belongsTo(Club, { foreignKey: 'awayTeam', as: 'awayClub' });

export default Club;
