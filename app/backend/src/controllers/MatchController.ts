import { NextFunction, Request, Response } from 'express';
// import EError from '../interfaces/EError';
// import HttpException from '../interfaces/HttpException';
import MatchService from '../services/MatchService';

class MatchController {
  _matchService: MatchService;

  constructor(matchService: MatchService) {
    this._matchService = matchService;
  }

  async List(_req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this._matchService.List();

      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }
}

export default MatchController;
