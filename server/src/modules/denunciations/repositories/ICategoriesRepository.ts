import Category from '../infra/typeorm/entities/Category';
import ICreateCategoriesDTO from '../dtos/ICreateCategoriesDTO';

export default interface ICategoriesRepository {
  create(data: ICreateCategoriesDTO): Promise<Category>;
  findById(id: string): Promise<Category> | undefined;
  index(): Promise<Category[]>;

  deleteById(id: string): void;
}
