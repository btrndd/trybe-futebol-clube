import LeaderboardAwayService from '../services/LeaderboardAwayService';
import LeaderboardController from '../controllers/LeaderboardController';
import LeaderboardHomeService from '../services/LeaderboardHomeService';

export default function LeaderboardFactory() {
  const leaderboardHomeService = new LeaderboardHomeService();
  const leaderboardAwayService = new LeaderboardAwayService();
  const leaderboardController = new LeaderboardController(
    leaderboardHomeService,
    leaderboardAwayService,
  );
  return leaderboardController;
}
