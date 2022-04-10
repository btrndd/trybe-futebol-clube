import Club from '../database/models/Club';
import LeaderboardResponse from '../dtos/LeaderboardReponse';
import ClubRepository from '../repositories/ClubRepository';
import MatchRepository from '../repositories/MatchRepository';

class LeaderboardAwayService {
  private _matchRepository = new MatchRepository();

  private _clubRepository = new ClubRepository();

  private async GetTotalResults(id: number) {
    const matchs = await this._matchRepository.List();
    const teamMatchs = matchs.filter((team) => team.awayTeam === id && team.inProgress === false);

    const wins = teamMatchs.filter((team) => team.awayTeamGoals > team.homeTeamGoals);
    const losses = teamMatchs.filter((team) => team.awayTeamGoals < team.homeTeamGoals);
    const draws = teamMatchs.filter((team) => team.homeTeamGoals === team.awayTeamGoals);

    const goalsFavor = teamMatchs.reduce((x, y): number => x + y.awayTeamGoals, 0);
    const goalsOwn = teamMatchs.reduce((x, y): number => x + y.homeTeamGoals, 0);

    const result = new LeaderboardResponse();
    result.totalPoints = (wins.length * 3) + draws.length;
    result.totalGames = teamMatchs.length;
    result.totalVictories = wins.length;
    result.totalLosses = losses.length;
    result.totalDraws = draws.length;
    result.goalsFavor = goalsFavor;
    result.goalsOwn = goalsOwn;
    result.goalsBalance = goalsFavor - goalsOwn;
    result.efficiency = +(((result.totalPoints) / (result.totalGames * 3)) * 100).toFixed(2);

    return result;
  }

  private mapResult(clubs: Club[]) {
    const result = clubs.map(async (club) => {
      const clubResult = await this.GetTotalResults(club.id);
      clubResult.name = club.clubName;
      return clubResult;
    });
    return result;
  }

  private static switchFunc(a: LeaderboardResponse, b: LeaderboardResponse, levels: boolean[]) {
    switch (true) {
      case levels[3]:
        return b.goalsOwn - a.goalsOwn;
      case levels[2]:
        return b.goalsFavor - a.goalsFavor;
      case levels[1]:
        return b.goalsBalance - a.goalsBalance;
      case levels[0]:
        return b.totalVictories - a.totalVictories;
      default:
        return b.totalPoints - a.totalPoints;
    }
  }

  private static sortFunction(a: LeaderboardResponse, b: LeaderboardResponse) {
    const levelFour = (
      a.totalPoints === b.totalPoints
      && a.totalVictories === b.totalVictories
      && a.goalsBalance === b.goalsBalance
      && a.goalsFavor === b.goalsFavor
    );
    const levelThree = (
      a.totalPoints === b.totalPoints
      && a.totalVictories === b.totalVictories
      && a.goalsBalance === b.goalsBalance
    );
    const levelTwo = (a.totalPoints === b.totalPoints && a.totalVictories === b.totalVictories);
    const levelOne = a.totalPoints === b.totalPoints;
    const levels = [levelOne, levelTwo, levelThree, levelFour];
    return LeaderboardAwayService.switchFunc(a, b, levels);
  }

  public async List() {
    const clubs = await this._clubRepository.List();
    const result = this.mapResult(clubs);
    const awaitedResult = await Promise.all(result);
    const sorted = awaitedResult.sort((a, b) => LeaderboardAwayService.sortFunction(a, b));
    return sorted;
  }
}

export default LeaderboardAwayService;
