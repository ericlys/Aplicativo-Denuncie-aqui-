import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IStorageProvider from '@shared/container/providers/StorageProviders/model/IStorageProvider';
import IDenunciationsRepository from '../repositories/IDenunciationsRepository';
import IAddressesRepository from '../repositories/IAddressesRepository';
import ICategoriesRepository from '../repositories/ICategoriesRepository';

import Denunciation from '../infra/typeorm/entities/Denunciation';

interface IRequest {
  anonymous: boolean;
  title: string;
  description: string;
  status: string;
  photoFilename: string | null;
  hour: Date;
  user_id: string;
  category_id: string;
  address: string;
  city: string;
  complement: string;
  latitude: number;
  longitude: number;
  number: string;
  street: string;
  zipcode: string;
}

@injectable()
class CreateDenunciationService {
  constructor(
    @inject('DenunciationsRepository')
    private denunciationsRepository: IDenunciationsRepository,
    @inject('AddressesRepository')
    private addressesRepositorynsRepository: IAddressesRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute(data: IRequest): Promise<Denunciation> {
    const checkUserId = await this.usersRepository.findById(data.user_id);

    if (!checkUserId) {
      throw new AppError('Error identifying user', 401);
    }

    const checkCategoryId = await this.categoriesRepository.findById(
      data.category_id,
    );

    if (!checkCategoryId) {
      throw new AppError('Error in category identification', 400);
    }

    const filename = await this.storageProvider.saveFile(data.photoFilename);

    const denunciation = await this.denunciationsRepository.create({
      anonymous: data.anonymous,
      description: data.description,
      hour: data.hour,
      photo: filename,
      status: data.status,
      title: data.title,
      user_id: data.user_id,
      category_id: data.category_id,
    });

    await this.addressesRepositorynsRepository.create({
      address: data.address,
      city: data.city,
      complement: data.complement,
      latitude: data.latitude,
      longitude: data.longitude,
      number: data.number,
      street: data.street,
      zipcode: data.zipcode,
      denunciation: denunciation.id,
    });

    return denunciation;
  }
}

export default CreateDenunciationService;
