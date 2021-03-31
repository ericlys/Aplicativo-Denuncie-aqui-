import { injectable, inject } from 'tsyringe';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import IDenunciationsRepository from '../repositories/IDenunciationsRepository';
import Denunciation from '../infra/typeorm/entities/Denunciation';

@injectable()
class ListUserDenunciationService {
  constructor(
    @inject('DenunciationsRepository')
    private denunciationsRepository: IDenunciationsRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(user_id: string): Promise<Denunciation[]> {
    const checkUser = await this.usersRepository.findById(user_id);

    if (!checkUser) {
      const denunciationAnonymous = await this.denunciationsRepository.findByUserAnonymousId(
        user_id,
      );
      if (!denunciationAnonymous) {
        throw new AppError('Invalid user identifier', 401);
      }
      return denunciationAnonymous;
    }

    const denunciations = await this.denunciationsRepository.findByUserId(
      user_id,
    );

    return denunciations;
  }
}

export default ListUserDenunciationService;
