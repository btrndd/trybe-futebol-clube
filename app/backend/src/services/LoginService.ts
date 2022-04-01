import { readFileSync } from 'fs';
import * as jwt from 'jsonwebtoken';
import User from '../database/models/User';

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
      const err = new Error();
      err.name = 'requiredData';
      err.message = '"email" is required';
      throw err;
    } if (this._email === '') {
      const err = new Error();
      err.name = 'emptyData';
      err.message = '"email" is not allowed to be empty';
      throw err;
    }
    if (regexEmail.test(this._email) === false) {
      const err = new Error();
      err.name = 'invalidData';
      err.message = '"email" must be a valid email';
      throw err;
    }
  }

  public VerifyPassword(): void {
    if (!this._password && this._password !== '') {
      const err = new Error();
      err.name = 'requiredData';
      err.message = '"password" is required';
      throw err;
    }
    if (this._password === '') {
      const err = new Error();
      err.name = 'invalidData';
      err.message = '"password" is not allowed to be empty';
      throw err;
    }
    if (this._password.length < 6) {
      const err = new Error();
      err.name = 'emptyData';
      err.message = '"password" length must be 6 characters long';
      throw err;
    }
  }

  public async Login() {
    this.VerifyPassword();
    this.VerifyEmail();
    const email = this._email;
    const user = await User.findOne({ where: { email } });
    if (!user || user.password !== this._password) {
      const err = new Error();
      err.name = 'unauthorized';
      err.message = 'Invalid fields';
      throw err;
    }
    const key = readFileSync('./jwt.evaluation.key', 'utf-8');
    const payload = { id: user.id, username: user.username, email, role: user.role };
    const token = jwt.sign(payload, key, {
      algorithm: 'HS256',
      expiresIn: '1d',
    });
    return { token, payload };
  }
}

export default LoginService;
