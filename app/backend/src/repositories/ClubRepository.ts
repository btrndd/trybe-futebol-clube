import Club from '../database/models/Club';

class ClubRepository {
  private _model = Club;

  async List(): Promise<Club[]> {
    const result = await this._model.findAll({ raw: true });
    return result as Club[];
  }

  async Get(id: Club['id']): Promise<Club> {
    const result = await this._model.findByPk(id, { raw: true });
    return result as Club;
  }

  // async edit(id: Club['id'], changes: EditUser): Promise<void> {
  //   await UserModel.update(
  //     { ...changes, updatedAt: new Date() },
  //     { where: { id } },
  //   );
  // }

  // async remove(id: Club['id']): Promise<void> {
  //   await UserModel.destroy({ where: { id } });
  // }

  // async add(data: AddUser): Promise<Club['id']> {
  //   const obj = await UserModel.create({ ...data, createdAt: new Date() });
  //   return obj.getDataValue('id');
  // }
}

export default ClubRepository;
