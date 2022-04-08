import MatchRequest from '../dtos/MatchRequest';
import Club from '../database/models/Club';
import Match from '../database/models/Match';

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

  // async edit(id: Match['id'], changes: EditUser): Promise<void> {
  //   await UserModel.update(
  //     { ...changes, updatedAt: new Date() },
  //     { where: { id } },
  //   );
  // }

  // async remove(id: Match['id']): Promise<void> {
  //   await UserModel.destroy({ where: { id } });
  // }

  async Add(data: MatchRequest): Promise<Match> {
    // const test = {
    //   homeTeam: data.homeTeam,
    //   homeTeamGoals: data.homeTeamGoals,
    //   awayTeam: data.awayTeam,
    //   awayTeamGoals: data.awayTeamGoals,
    //   inProgress: true,
    // };
    const createdMatch = await this._model.create(data);
    return createdMatch;
  }
}

export default MatchRepository;
