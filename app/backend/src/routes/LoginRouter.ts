import * as express from 'express';
import LoginController from '../controllers/LoginController';

const router = express.Router();

// LOGIN
router.post('/login', LoginController.Login);

export default router;
