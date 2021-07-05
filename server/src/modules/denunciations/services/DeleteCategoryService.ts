import { injectable, inject } from 'tsyringe';
import ICategoriesRepository from '../repositories/ICategoriesRepository';

@injectable()
class DeleteCategoryService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  public execute(id: string): void {
    this.categoriesRepository.deleteById(id);
  }
}

export default DeleteCategoryService;
