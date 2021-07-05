import { injectable, inject } from 'tsyringe';
import IDenunciationsRepository from '../repositories/IDenunciationsRepository';
import Denunciation from '../infra/typeorm/entities/Denunciation';

@injectable()
class FindDenunciationService {
  constructor(
    @inject('DenunciationsRepository')
    private denunciationsRepository: IDenunciationsRepository,
  ) {}

  public async execute(id: string): Promise<Denunciation> {
    const denunciations = await this.denunciationsRepository.findById(id);

    return denunciations;
  }
}

export default FindDenunciationService;
