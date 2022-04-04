import Club from '../database/models/Club';
import Match from '../database/models/Match';

class MatchRepository {
  private _match: Match | Match[] | null;

  async list(): Promise<Match[]> {
    const result = await Match.findAll({
      include: [{
        as: 'homeClub',
        model: Club,
        attributes: { exclude: ['id'] },
      },
      {
        as: 'awayClub',
        model: Club,
        attributes: { exclude: ['id'] },
      }],
    });
    this._match = result;
    return this._match as Match[];
  }

  // async edit(id: Match['id'], changes: EditUser): Promise<void> {
  //   await UserModel.update(
  //     { ...changes, updatedAt: new Date() },
  //     { where: { id } },
  //   );
  // }

  // async remove(id: Match['id']): Promise<void> {
  //   await UserModel.destroy({ where: { id } });
  // }

  // async add(data: AddUser): Promise<Match['id']> {
  //   const obj = await UserModel.create({ ...data, createdAt: new Date() });
  //   return obj.getDataValue('id');
  // }
}

export default MatchRepository;
