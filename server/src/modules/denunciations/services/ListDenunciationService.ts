import { injectable, inject } from 'tsyringe';
import IDenunciationsRepository from '../repositories/IDenunciationsRepository';
import Denunciation from '../infra/typeorm/entities/Denunciation';

@injectable()
class ListDenunciationService {
  constructor(
    @inject('DenunciationsRepository')
    private denunciationsRepository: IDenunciationsRepository,
  ) {}

  public async execute(): Promise<Denunciation[]> {
    const denunciations = await this.denunciationsRepository.index();

    return denunciations;
  }
}

export default ListDenunciationService;
