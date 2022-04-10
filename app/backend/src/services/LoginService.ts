import bcrypt = require('bcryptjs');
import { readFileSync } from 'fs';
import * as jwt from 'jsonwebtoken';
import HttpException from '../interfaces/HttpException';
import EError from '../interfaces/EError';
import LoginRepository from '../repositories/LoginRepository';

class LoginService {
  _loginRepository: LoginRepository;

  _key: string;

  constructor(loginRepository: LoginRepository) {
    this._loginRepository = loginRepository;
    this._key = readFileSync('./jwt.evaluation.key', 'utf-8');
  }

  private static VerifyEmail(email: string): void {
    const missingMailMessage = 'All fields must be filled';
    if (!email && email !== '') {
      const err = new HttpException(EError.notAuthorized, missingMailMessage);
      throw err;
    } if (email === '') {
      const err = new HttpException(EError.notAuthorized, missingMailMessage);
      throw err;
    }
  }

  private static VerifyPassword(password: string): void {
    const missingPasswordMessage = 'All fields must be filled';
    if (!password && password !== '') {
      const err = new HttpException(EError.notAuthorized, missingPasswordMessage);
      throw err;
    }
    if (password === '') {
      const err = new HttpException(EError.notAuthorized, missingPasswordMessage);
      throw err;
    }
    if (password.length < 6) {
      const error = '"password" length must be 6 characters long';
      const err = new HttpException(EError.notAuthorized, error);
      throw err;
    }
  }

  public async Login(email: string, password: string) {
    LoginService.VerifyPassword(password);
    LoginService.VerifyEmail(email);
    const foundUser = await this._loginRepository.getByEmail(email);
    const checkPassword = await bcrypt.compare(password, foundUser?.password || 'not');
    if (!foundUser || !checkPassword) {
      const err = new HttpException(EError.notAuthorized, 'Incorrect email or password');
      throw err;
    }
    const user = { id: foundUser.id, username: foundUser.username, email, role: foundUser.role };
    const token = jwt.sign(user, this._key, {
      algorithm: 'HS256',
      expiresIn: '1d',
    });
    return { user, token };
  }

  public Validate(token: string): jwt.JwtPayload {
    const decoded = jwt.verify(
      token,
      this._key,
      { algorithms: ['HS256'] },
    );
    return decoded as jwt.JwtPayload;
  }
}

export default LoginService;
