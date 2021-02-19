import Category from '../infra/typeorm/entities/Category';
import ICreateCategoriesDTO from '../dtos/ICreateCategoriesDTO';

export default interface ICategoriesRepository {
  create(data: ICreateCategoriesDTO): Promise<Category>;
}
