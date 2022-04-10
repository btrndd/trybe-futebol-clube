import LeaderboardHomeController from '../controllers/LeaderboardHomeController';
import LeaderboardHomeService from '../services/LeaderboardHomeService';

export default function LeaderboardHomeFactory() {
  const leaderboardHomeService = new LeaderboardHomeService();
  const leaderboardHomeController = new LeaderboardHomeController(leaderboardHomeService);
  return leaderboardHomeController;
}
