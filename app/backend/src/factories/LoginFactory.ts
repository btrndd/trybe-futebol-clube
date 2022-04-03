import LoginRepository from '../repositories/LoginRepository';
import LoginController from '../controllers/LoginController';
import LoginService from '../services/LoginService';

export default function LoginFactory() {
  const loginRepository = new LoginRepository();
  const loginService = new LoginService(loginRepository);
  const loginController = new LoginController(loginService);
  return loginController;
}
