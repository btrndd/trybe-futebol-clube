import * as express from 'express';
import LeaderboardHomeFactory from '../factories/LeaderboardHomeFactory';

const router = express.Router();
const controller = LeaderboardHomeFactory();

// LEADERBOARD
router.get('/home', (req, res, next) => {
  controller.List(req, res, next);
});

export default router;
