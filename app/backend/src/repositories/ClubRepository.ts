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
}

export default ClubRepository;
