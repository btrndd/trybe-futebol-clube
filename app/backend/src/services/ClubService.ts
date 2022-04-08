import HttpException from '../interfaces/HttpException';
import EError from '../interfaces/EError';
import ClubRepository from '../repositories/ClubRepository';

class ClubService {
  _clubRepository: ClubRepository;

  constructor(clubRepository: ClubRepository) {
    this._clubRepository = clubRepository;
  }

  public async List() {
    const clubs = await this._clubRepository.List();
    return clubs;
  }

  public async Get(id: number) {
    const club = await this._clubRepository.Get(id);

    if (!club) {
      throw new HttpException(EError.notFound, 'Oops! Club not found...');
    }

    return club;
  }
}

export default ClubService;
