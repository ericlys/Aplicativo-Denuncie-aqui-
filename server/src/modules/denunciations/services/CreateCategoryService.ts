import { injectable, inject } from 'tsyringe';
import ICategoriesRepository from '../repositories/ICategoriesRepository';
import Category from '../infra/typeorm/entities/Category';

interface IRequest {
  title: string;
  icon: string;
}

@injectable()
class CreateCategoryService {
  constructor(
    @inject('CategoriesRepository')
    private denunciationsRepository: ICategoriesRepository,
  ) {}

  public async execute(data: IRequest): Promise<Category> {
    const category = await this.denunciationsRepository.create(data);

    return category;
  }
}

export default CreateCategoryService;
