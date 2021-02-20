import { injectable, inject } from 'tsyringe';
import Address from '../infra/typeorm/entities/Address';
import IDenunciationsRepository from '../repositories/IDenunciationsRepository';
import IAddressesRepository from '../repositories/IAddressesRepository';
import Denunciation from '../infra/typeorm/entities/Denunciation';

interface IRequest {
  anonymous: boolean;
  title: string;
  description: string;
  status: string;
  photo: string | null;
  address: Address;
  hour: Date;
  user_id: string;
  category_id: string;
}

@injectable()
class CreateDenunciationService {
  constructor(
    @inject('DenunciationsRepository')
    private denunciationsRepository: IDenunciationsRepository,
    @inject('AddressesRepository')
    private addressesRepositorynsRepository: IAddressesRepository,
  ) {}

  public async execute(data: IRequest): Promise<Denunciation> {
    const denunciation = await this.denunciationsRepository.create({
      anonymous: data.anonymous,
      description: data.description,
      hour: data.hour,
      photo: data.photo,
      status: data.status,
      title: data.title,
      user_id: data.user_id,
      category_id: data.category_id,
    });

    const addres = {
      address: data.address.address,
      city: data.address.city,
      complement: data.address.complement,
      latitude: data.address.latitude,
      longitude: data.address.longitude,
      number: data.address.number,
      street: data.address.street,
      zipcode: data.address.zipcode,
      denunciation: denunciation.id,
    };

    await this.addressesRepositorynsRepository.create(addres);

    return denunciation;
  }
}

export default CreateDenunciationService;
