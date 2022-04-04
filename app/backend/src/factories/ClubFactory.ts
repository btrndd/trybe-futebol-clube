import ClubRepository from '../repositories/ClubRepository';
import ClubController from '../controllers/ClubController';
import ClubService from '../services/ClubService';

export default function ClubFactory() {
  const clubRepository = new ClubRepository();
  const clubService = new ClubService(clubRepository);
  const clubController = new ClubController(clubService);
  return clubController;
}
