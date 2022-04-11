import * as express from 'express';
import LeaderboardHomeFactory from '../factories/LeaderboardFactory';

const router = express.Router();
const controller = LeaderboardHomeFactory();

// LEADERBOARD
router.get('/home', (req, res, next) => {
  controller.ListHome(req, res, next);
});

router.get('/away', (req, res, next) => {
  controller.ListAway(req, res, next);
});

router.get('/', (req, res, next) => {
  controller.List(req, res, next);
});

export default router;
