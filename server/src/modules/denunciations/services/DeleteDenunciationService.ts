import { injectable, inject } from 'tsyringe';
import IDenunciationsRepository from '../repositories/IDenunciationsRepository';

@injectable()
class DeleteDenunciationService {
  constructor(
    @inject('DenunciationsRepository')
    private denunciationsRepository: IDenunciationsRepository,
  ) {}

  public execute(id: string): void {
    this.denunciationsRepository.deleteById(id);
  }
}

export default DeleteDenunciationService;
