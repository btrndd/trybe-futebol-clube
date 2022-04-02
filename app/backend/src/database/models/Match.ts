import { DataTypes, Model } from 'sequelize';
import db from '.';
import Club from './Club';

export default class Match extends Model {
  public id: number;

  public homeTeam: number;

  public homeTeamGoals: number;

  public awayTeam: number;

  public awayTeamGoals: number;

  public inProgress: boolean;
}

Match.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    homeTeam: { type: DataTypes.INTEGER, allowNull: false },

    homeTeamGoals: { type: DataTypes.INTEGER, allowNull: false },

    awayTeam: { type: DataTypes.INTEGER, allowNull: false },

    awayTeamGoals: { type: DataTypes.INTEGER, allowNull: false },

    inProgress: { type: DataTypes.TINYINT, allowNull: false },
  },

  {
    underscored: true,
    sequelize: db,
    timestamps: false,
    modelName: 'match',
    tableName: 'matchs',
  },
);

Match.belongsTo(Club, { foreignKey: 'home_team', as: 'homeClub' });
Match.belongsTo(Club, { foreignKey: 'away_team', as: 'awayClub' });

Club.hasMany(Match, { foreignKey: 'id', as: 'homeMatch' });
Club.hasMany(Match, { foreignKey: 'id', as: 'awayMatch' });
