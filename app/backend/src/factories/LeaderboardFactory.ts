import LeaderboardAwayService from '../services/LeaderboardAwayService';
import LeaderboardController from '../controllers/LeaderboardController';
import LeaderboardHomeService from '../services/LeaderboardHomeService';
import LeaderboardService from '../services/LeaderboardService';

export default function LeaderboardFactory() {
  const leaderboardHomeService = new LeaderboardHomeService();
  const leaderboardAwayService = new LeaderboardAwayService();
  const leaderboardService = new LeaderboardService();
  const leaderboardController = new LeaderboardController(
    leaderboardHomeService,
    leaderboardAwayService,
    leaderboardService,
  );
  return leaderboardController;
}
