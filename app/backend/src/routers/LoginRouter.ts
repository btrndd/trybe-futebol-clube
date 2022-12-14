import * as express from 'express';
import LoginFactory from '../factories/LoginFactory';

const router = express.Router();
const controller = LoginFactory();

// LOGIN
router.post('/', (req, res, next) => {
  controller.Login(req, res, next);
});

router.get('/validate', (req, res, next) => {
  controller.Validate(req, res, next);
});

export default router;
