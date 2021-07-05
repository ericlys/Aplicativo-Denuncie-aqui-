import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IDenunciationsRepository from '../repositories/IDenunciationsRepository';
import Denunciation from '../infra/typeorm/entities/Denunciation';

interface IRequest {
  id: string;
  status: string;
}

@injectable()
class UpdateStatusService {
  constructor(
    @inject('DenunciationsRepository')
    private denunciationsRepository: IDenunciationsRepository,
  ) {}

  public async execute({ id, status }: IRequest): Promise<Denunciation> {
    const denunciation = await this.denunciationsRepository.findById(id);

    if (!denunciation) {
      throw new AppError('Denunciation does not exists.', 401);
    }

    denunciation.status = status;

    await this.denunciationsRepository.save(denunciation);

    return denunciation;
  }
}

export default UpdateStatusService;
