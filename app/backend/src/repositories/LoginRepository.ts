import User from '../database/models/User';

export default class LoginRepository {
  private _model = User;

  async getByEmail(email: string) {
    const result = await this._model.findOne({ where: { email }, raw: true });
    return result;
  }
}
