// import HttpException from '../interfaces/HttpException';
// import EError from '../interfaces/EError';
import MatchRepository from '../repositories/MatchRepository';

class MatchService {
  _matchRepository: MatchRepository;

  constructor(matchRepository: MatchRepository) {
    this._matchRepository = matchRepository;
  }

  public async List() {
    const matchs = await this._matchRepository.list();
    return matchs;
  }
}

export default MatchService;
