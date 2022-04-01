import { Model, DataTypes } from 'sequelize';
import db from '.';

export default class Club extends Model {
  public id: number;

  public clubName: string;
}

Club.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },

    clubName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },

  {
    underscored: true,
    sequelize: db,
    modelName: 'club',
    timestamps: false,
    tableName: 'clubs',
  },
);
