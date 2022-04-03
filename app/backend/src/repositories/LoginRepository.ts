import User from '../database/models/User';

export default class LoginRepository {
  private user: User | null;
  // async get(id: User['id']): Promise<User> {
  //   const result = await UserModel.findByPk(id, { raw: true });
  //   return result as unknown as User;
  // }

  async getByEmail(email: string) {
    const result = await User.findOne({ where: { email } });
    this.user = result;
    console.log(this.user);
    return result;
  }

  // async edit(id: User['id'], changes: EditUser): Promise<void> {
  //   await UserModel.update(
  //     { ...changes, updatedAt: new Date() },
  //     { where: { id } },
  //   );
  // }

  // async remove(id: User['id']): Promise<void> {
  //   await UserModel.destroy({ where: { id } });
  // }

  // async add(data: AddUser): Promise<User['id']> {
  //   const obj = await UserModel.create({ ...data, createdAt: new Date() });
  //   return obj.getDataValue('id');
  // }

  // async list(): Promise<User[]> {
  //   const items = await UserModel.findAll({ raw: true });
  //   return items as unknown as User[];
  // }
}
