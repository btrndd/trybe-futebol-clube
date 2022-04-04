import * as express from 'express';
import ClubFactory from '../factories/ClubFactory';

const router = express.Router();
const controller = ClubFactory();

// CLUBS
router.get('/', (req, res, next) => {
  controller.List(req, res, next);
});

router.get('/:id', (req, res, next) => {
  controller.Get(req, res, next);
});

export default router;
