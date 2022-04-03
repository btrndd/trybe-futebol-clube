import { NextFunction, Request, Response } from 'express';
import LoginService from '../services/LoginService';

class LoginController {
  static async Login(req: Request, res: Response, next: NextFunction) {
    try {
      const service = new LoginService(req.body.email, req.body.password);
      const response = await service.Login();

      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }
}

export default LoginController;
