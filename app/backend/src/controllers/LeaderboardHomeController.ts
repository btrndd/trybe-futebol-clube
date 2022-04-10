import { NextFunction, Request, Response } from 'express';
import LeaderboardHomeService from '../services/LeaderboardHomeService';
// import EError from '../interfaces/EError';
// import HttpException from '../interfaces/HttpException';

class LeaderboardHomeController {
  _leaderboardHomeService: LeaderboardHomeService;

  constructor(leaderboardHomeService: LeaderboardHomeService) {
    this._leaderboardHomeService = leaderboardHomeService;
  }

  async List(_req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this._leaderboardHomeService.List();

      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }
}

export default LeaderboardHomeController;
