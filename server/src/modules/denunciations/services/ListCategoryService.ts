import { injectable, inject } from 'tsyringe';
import ICategoriesRepository from '../repositories/ICategoriesRepository';
import Category from '../infra/typeorm/entities/Category';

@injectable()
class ListCategoryService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  public async execute(): Promise<Category[]> {
    const categories = await this.categoriesRepository.index();

    return categories;
  }
}

export default ListCategoryService;
