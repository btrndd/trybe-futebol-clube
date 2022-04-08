import MatchRequest from '../dtos/MatchRequest';
import Club from '../database/models/Club';
import Match from '../database/models/Match';
import ScoreRequest from '../dtos/ScoreRequest';

class MatchRepository {
  private _model = Match;

  async List(): Promise<Match[]> {
    const result = await this._model.findAll({
      include: [{
        as: 'homeClub',
        model: Club,
        attributes: { exclude: ['id'] },
      },
      {
        as: 'awayClub',
        model: Club,
        attributes: { exclude: ['id'] },
      }],
    });
    return result;
  }

  async Get(id: Match['id']): Promise<Match> {
    const result = await this._model.findByPk(id, { raw: true });
    return result as Match;
  }

  async EndMatch(id: Match['id']): Promise<void> {
    await this._model.update(
      { inProgress: false },
      { where: { id } },
    );
  }

  async EditScore(id: Match['id'], score: ScoreRequest): Promise<void> {
    await this._model.update(
      score,
      { where: { id } },
    );
  }

  async Add(data: MatchRequest): Promise<Match> {
    const createdMatch = await this._model.create(data);
    return createdMatch;
  }
}

export default MatchRepository;
