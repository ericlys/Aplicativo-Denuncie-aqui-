import { getRepository, Repository } from 'typeorm';

import ICreateDenunciationDTO from '@modules/denunciations/dtos/ICreateDenunciationDTO';
import IDenunciationsRepository from '@modules/denunciations/repositories/IDenunciationsRepository';
import Denunciation from '../entities/Denunciation';

class DenunciationsRepository implements IDenunciationsRepository {
  private ormRepository: Repository<Denunciation>;

  constructor() {
    this.ormRepository = getRepository(Denunciation);
  }

  public async create({
    anonymous,
    description,
    hour,
    photo,
    status,
    title,
    user_id,
    category_id,
  }: ICreateDenunciationDTO): Promise<Denunciation> {
    const denunciation = this.ormRepository.create({
      anonymous,
      description,
      hour,
      photo,
      status,
      title,
      user: { id: user_id },
      category: { id: category_id },
    });

    await this.ormRepository.save(denunciation);
    return denunciation;
  }

  public async save(denunciation: Denunciation): Promise<Denunciation> {
    return this.ormRepository.save(denunciation);
  }

  public async index(): Promise<Denunciation[]> {
    return this.ormRepository.find();
  }
}
export default DenunciationsRepository;
