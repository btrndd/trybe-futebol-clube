import HttpException from '../interfaces/HttpException';
import EError from '../interfaces/EError';
import ClubRepository from '../repositories/ClubRepository';
import MatchRequest from '../dtos/MatchRequest';
import MatchRepository from '../repositories/MatchRepository';

class MatchService {
  private _matchRepository: MatchRepository;

  private _clubRepository = new ClubRepository();

  constructor(matchRepository: MatchRepository) {
    this._matchRepository = matchRepository;
  }

  public async List() {
    const matchs = await this._matchRepository.List();
    return matchs;
  }

  public async Add(data: MatchRequest) {
    const awayTeam = await this._clubRepository.Get(data.awayTeam);
    if (!awayTeam) {
      throw new HttpException(EError.notFound, 'Oops! Away team not found...');
    }

    const homeTeam = await this._clubRepository.Get(data.homeTeam);
    if (!homeTeam) {
      throw new HttpException(EError.notFound, 'Oops! Home team not found...');
    }

    const match = await this._matchRepository.Add(data);
    return match;
  }
}

export default MatchService;
