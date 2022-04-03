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

  Validate(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Not authorized!' });
    }
    try {
      const response = this._loginService.Validate(token);
      const { role } = response;
      res.status(200).json(role);
    } catch (err) {
      next(err);
    }
  }
}

export default LoginController;
