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
    timestamps: false,
  },
);

Club.hasMany(Match, { foreignKey: 'home_team', as: 'homeClub' });
Club.hasMany(Match, { foreignKey: 'away_team', as: 'awayClub' });

Match.belongsTo(Club, { foreignKey: 'home_team', as: 'homeClub' });
Match.belongsTo(Club, { foreignKey: 'away_team', as: 'awayClub' });

export default Club;
