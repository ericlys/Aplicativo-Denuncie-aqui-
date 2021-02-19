import { getRepository, Repository } from 'typeorm';

import ICreateCategoriesDTO from '@modules/denunciations/dtos/ICreateCategoriesDTO';
import ICategoriesRepository from '@modules/denunciations/repositories/ICategoriesRepository';
import Category from '../entities/Category';

class CategoriesRepository implements ICategoriesRepository {
  private ormRepository: Repository<Category>;

  constructor() {
    this.ormRepository = getRepository(Category);
  }

  public async create(date: ICreateCategoriesDTO): Promise<Category> {
    const category = this.ormRepository.create(date);

    await this.ormRepository.save(category);
    return category;
  }
}
export default CategoriesRepository;
