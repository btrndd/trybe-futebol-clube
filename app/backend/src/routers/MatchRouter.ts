import * as express from 'express';
import MatchFactory from '../factories/MatchFactory';

const router = express.Router();
const controller = MatchFactory();

// MATCHS
router.get('/', (req, res, next) => {
  controller.List(req, res, next);
});

export default router;
