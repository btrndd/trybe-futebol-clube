import HttpException from '../interfaces/HttpException';
import EError from '../interfaces/EError';
import ClubRepository from '../repositories/ClubRepository';
import MatchRequest from '../dtos/MatchRequest';
import MatchRepository from '../repositories/MatchRepository';
import ScoreRequest from '../dtos/ScoreRequest';

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
    const homeTeam = await this._clubRepository.Get(data.homeTeam);

    if (!awayTeam || !homeTeam) {
      throw new HttpException(EError.notFound, 'There is no team with such id!');
    }

    if (data.homeTeam === data.awayTeam) {
      throw new HttpException(
        EError.invalidData,
        'It is not possible to create a match with two equal teams',
      );
    }

    const match = await this._matchRepository.Add(data);
    return match;
  }

  public async EndMatch(id: number) {
    const match = await this._matchRepository.Get(id);
    if (!match) {
      throw new HttpException(EError.notFound, 'There is no match with such id!');
    }
    await this._matchRepository.EndMatch(id);
    return { message: 'Match ended successfully!' };
  }

  public async EditScore(id: number, score: ScoreRequest) {
    const match = await this._matchRepository.Get(id);
    if (!match) {
      throw new HttpException(EError.notFound, 'There is no match with such id!');
    }
    await this._matchRepository.EditScore(id, score);
    return { message: 'Match score updated successfully!' };
  }
}

export default MatchService;
