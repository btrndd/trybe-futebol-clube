export default class ScoreRequest {
  public homeTeamGoals: number;

  public awayTeamGoals: number;

  constructor(
    homeTeamGoals: number,
    awayTeamGoals: number,
  ) {
    this.awayTeamGoals = awayTeamGoals;
    this.homeTeamGoals = homeTeamGoals;
  }
}
