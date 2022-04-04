import MatchRepository from '../repositories/MatchRepository';
import MatchController from '../controllers/MatchController';
import MatchService from '../services/MatchService';

export default function MatchFactory() {
  const matchRepository = new MatchRepository();
  const matchService = new MatchService(matchRepository);
  const matchController = new MatchController(matchService);
  return matchController;
}
