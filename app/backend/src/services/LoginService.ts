import { readFileSync } from 'fs';
import * as jwt from 'jsonwebtoken';
import HttpException from '../interfaces/HttpException';
import EError from '../interfaces/EError';
import LoginRepository from '../repositories/LoginRepository';

class LoginService {
  _loginRepository: LoginRepository;

  constructor(loginRepository: LoginRepository) {
    this._loginRepository = loginRepository;
  }

  private static VerifyEmail(email: string): void {
    const regexEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!email && email !== '') {
      const err = new HttpException(EError.isRequired, '"email" is required');
      throw err;
    } if (email === '') {
      const err = new HttpException(EError.invalidData, '"email" is not allowed to be empty');
      throw err;
    }
    if (regexEmail.test(email) === false) {
      const error = '"email" must be a valid email';
      const err = new HttpException(EError.invalidData, error);
      throw err;
    }
  }

  private static VerifyPassword(password: string): void {
    if (!password && password !== '') {
      const err = new HttpException(EError.isRequired, '"password" is required');
      throw err;
    }
    if (password === '') {
      const err = new HttpException(EError.invalidData, '"password" is not allowed to be empty');
      throw err;
    }
    if (password.length < 6) {
      const error = '"password" length must be 6 characters long';
      const err = new HttpException(EError.invalidData, error);
      throw err;
    }
  }

  public async Login(email: string, password: string) {
    LoginService.VerifyPassword(password);
    LoginService.VerifyEmail(email);
    const foundUser = await this._loginRepository.getByEmail(email);
    if (!foundUser || foundUser.password !== password) {
      const err = new HttpException(EError.notAuthorized, 'Invalid fields');
      throw err;
    }
    console.log(foundUser);
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
