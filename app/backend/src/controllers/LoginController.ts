import { Request, Response } from 'express';
import LoginService from '../services/LoginService';

class LoginController {
  static async Login(req: Request, res: Response) {
    const service = new LoginService(req.body.email, req.body.password);
    const response = await service.Login();

    res.status(200).json({ response });
  }
}

export default LoginController;
