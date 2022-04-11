import { NextFunction, Request, Response } from 'express';
import LeaderboardHomeService from '../services/LeaderboardHomeService';
import LeaderboardAwayService from '../services/LeaderboardAwayService';
import LeaderboardService from '../services/LeaderboardService';
// import EError from '../interfaces/EError';
// import HttpException from '../interfaces/HttpException';

class LeaderboardController {
  _leaderboardHomeService: LeaderboardHomeService;

  _leaderboardAwayService: LeaderboardAwayService;

  _leaderboardService: LeaderboardService;

  constructor(
    leaderboardHomeService: LeaderboardHomeService,
    leaderboardAwayService: LeaderboardAwayService,
    leaderboardService: LeaderboardService,
  ) {
    this._leaderboardHomeService = leaderboardHomeService;
    this._leaderboardAwayService = leaderboardAwayService;
    this._leaderboardService = leaderboardService;
  }

  async ListHome(_req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this._leaderboardHomeService.List();

      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  async ListAway(_req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this._leaderboardAwayService.List();

      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  async List(_req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this._leaderboardService.List();

      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }
}

export default LeaderboardController;
