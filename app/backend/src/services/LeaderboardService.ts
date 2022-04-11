import LeaderboardResponse from '../dtos/LeaderboardReponse';
import LeaderboardAwayService from './LeaderboardAwayService';
import LeaderboardHomeService from './LeaderboardHomeService';

class LeaderboardService {
  private _homeService = new LeaderboardHomeService();

  private _awayService = new LeaderboardAwayService();

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
    return LeaderboardService.switchFunc(a, b, levels);
  }

  private static sumLists(homeData: LeaderboardResponse[], awayData: LeaderboardResponse[]) {
    const results: LeaderboardResponse[] = [];
    homeData.map((club) => club.name).forEach((name) => {
      const result = new LeaderboardResponse();
      const home = homeData.filter((club) => club.name === name)[0];
      const away = awayData.filter((club) => club.name === name)[0];
      result.name = home.name;
      result.totalPoints = home.totalPoints + away.totalPoints;
      result.totalGames = home.totalGames + away.totalGames;
      result.totalVictories = home.totalVictories + away.totalVictories;
      result.totalLosses = home.totalLosses + away.totalLosses;
      result.totalDraws = home.totalDraws + away.totalDraws;
      result.goalsFavor = home.goalsFavor + away.goalsFavor;
      result.goalsOwn = home.goalsOwn + away.goalsOwn;
      result.goalsBalance = result.goalsFavor - result.goalsOwn;
      result.efficiency = +(((result.totalPoints) / (result.totalGames * 3)) * 100).toFixed(2);
      results.push(result);
    });
    return results;
  }

  public async List() {
    const homeData = await this._homeService.List();
    const awayData = await this._awayService.List();
    const results = LeaderboardService.sumLists(homeData, awayData);
    return results.sort((a, b) => LeaderboardService.sortFunction(a, b));
  }
}

export default LeaderboardService;
