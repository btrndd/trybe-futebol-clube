import { NextFunction, Request, Response } from 'express';
import LoginService from '../services/LoginService';

class LoginController {
  _loginService: LoginService;

  constructor(loginService: LoginService) {
    this._loginService = loginService;
  }

  async Login(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this._loginService.Login(req.body.email, req.body.password);

      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }
}

export default LoginController;
