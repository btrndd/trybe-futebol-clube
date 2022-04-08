export default class Match {
  public homeTeam: number;

  public homeTeamGoals: number;

  public awayTeam: number;

  public awayTeamGoals: number;

  public inProgress = true;

  constructor(
    homeTeam: number,
    homeTeamGoals: number,
    awayTeam: number,
    awayTeamGoals: number,
  ) {
    this.awayTeam = awayTeam;
    this.awayTeamGoals = awayTeamGoals;
    this.homeTeam = homeTeam;
    this.homeTeamGoals = homeTeamGoals;
  }
}
