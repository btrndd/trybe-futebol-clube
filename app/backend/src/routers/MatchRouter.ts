import * as express from 'express';
import authMiddleware from '../middlewares/authMiddleware';
import MatchFactory from '../factories/MatchFactory';

const router = express.Router();
const controller = MatchFactory();

// MATCHS
router.get('/', (req, res, next) => {
  controller.List(req, res, next);
});

router.post('/', authMiddleware.auth, (req, res, next) => {
  controller.Add(req, res, next);
});

router.patch('/:id/finish', (req, res, next) => {
  controller.EndMatch(req, res, next);
});

export default router;
