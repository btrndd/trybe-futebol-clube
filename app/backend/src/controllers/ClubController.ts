import { NextFunction, Request, Response } from 'express';
import EError from '../interfaces/EError';
import HttpException from '../interfaces/HttpException';
import ClubService from '../services/ClubService';

class ClubController {
  _clubService: ClubService;

  constructor(clubService: ClubService) {
    this._clubService = clubService;
  }

  async List(_req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this._clubService.List();

      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  async Get(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      if (Number.isNaN(+id)) {
        throw new HttpException(EError.invalidData, 'Oops! Seems it does not exist...');
      }
      const response = await this._clubService.Get(+id);

      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }
}

export default ClubController;
