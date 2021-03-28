import { injectable, inject } from 'tsyringe';
import IDenunciationsRepository from '../repositories/IDenunciationsRepository';
import Denunciation from '../infra/typeorm/entities/Denunciation';

@injectable()
class ListUserDenunciationService {
  constructor(
    @inject('DenunciationsRepository')
    private denunciationsRepository: IDenunciationsRepository,
  ) {}

  public async execute(user_id: string): Promise<Denunciation[]> {
    const denunciations = await this.denunciationsRepository.findByUserId(
      user_id,
    );

    return denunciations;
  }
}

export default ListUserDenunciationService;
