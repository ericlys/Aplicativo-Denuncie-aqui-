import { getRepository, Repository } from 'typeorm';

import ICreateCategoriesDTO from '@modules/denunciations/dtos/ICreateCategoriesDTO';
import ICategoriesRepository from '@modules/denunciations/repositories/ICategoriesRepository';
import Category from '../entities/Category';

class CategoriesRepository implements ICategoriesRepository {
  private ormRepository: Repository<Category>;

  constructor() {
    this.ormRepository = getRepository(Category);
  }

  public deleteById(id: string): void {
    this.ormRepository.delete(id);
  }

  public async index(): Promise<Category[]> {
    const categories = this.ormRepository.find();
    return categories;
  }

  public async findById(id: string): Promise<Category> {
    const category = this.ormRepository.findOne(id);
    return category;
  }

  public async create(date: ICreateCategoriesDTO): Promise<Category> {
    const category = this.ormRepository.create(date);

    await this.ormRepository.save(category);
    return category;
  }
}
export default CategoriesRepository;
