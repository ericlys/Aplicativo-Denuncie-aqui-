import { injectable, inject } from 'tsyringe';
import IStorageProvider from '@shared/container/providers/StorageProviders/model/IStorageProvider';
import ICategoriesRepository from '../repositories/ICategoriesRepository';
import Category from '../infra/typeorm/entities/Category';

interface IRequest {
  title: string;
  icon: string | null;
}

@injectable()
class CreateCategoryService {
  constructor(
    @inject('CategoriesRepository')
    private denunciationsRepository: ICategoriesRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute(data: IRequest): Promise<Category> {
    const filename = await this.storageProvider.saveFile(data.icon);
    const category = await this.denunciationsRepository.create({
      title: data.title,
      icon: filename,
    });

    return category;
  }
}

export default CreateCategoryService;
