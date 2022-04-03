import { readFileSync } from 'fs';
import * as jwt from 'jsonwebtoken';
import HttpException from '../interfaces/HttpException';
import User from '../database/models/User';
import EError from '../interfaces/EError';

class LoginService {
  _email: string;

  _password: string;

  constructor(email: string, password: string) {
    this._email = email;
    this._password = password;
  }

  public VerifyEmail(): void {
    const regexEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!this._email && this._email !== '') {
      const err = new HttpException(EError.isRequired, '"email" is required');
      throw err;
    } if (this._email === '') {
      const err = new HttpException(EError.invalidData, '"email" is not allowed to be empty');
      throw err;
    }
    if (regexEmail.test(this._email) === false) {
      const error = '"email" must be a valid email';
      const err = new HttpException(EError.invalidData, error);
      throw err;
    }
  }

  public VerifyPassword(): void {
    if (!this._password && this._password !== '') {
      const err = new HttpException(EError.isRequired, '"password" is required');
      throw err;
    }
    if (this._password === '') {
      const err = new HttpException(EError.invalidData, '"password" is not allowed to be empty');
      throw err;
    }
    if (this._password.length < 6) {
      const error = '"password" length must be 6 characters long';
      const err = new HttpException(EError.invalidData, error);
      throw err;
    }
  }

  public async Login() {
    this.VerifyPassword();
    this.VerifyEmail();
    const email = this._email;
    const foundUser = await User.findOne({ where: { email } });
    if (!foundUser || foundUser.password !== this._password) {
      const err = new HttpException(EError.notAuthorized, 'Invalid fields');
      throw err;
    }
    const key = readFileSync('./jwt.evaluation.key', 'utf-8');
    const user = { id: foundUser.id, username: foundUser.username, email, role: foundUser.role };
    const token = jwt.sign(user, key, {
      algorithm: 'HS256',
      expiresIn: '1d',
    });
    return { user, token };
  }
}

export default LoginService;
