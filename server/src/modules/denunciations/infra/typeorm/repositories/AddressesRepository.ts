import { DeleteResult, getRepository, Repository } from 'typeorm';

import ICreateAddressDTO from '@modules/denunciations/dtos/ICreateAddressDTO';
import IAddressRepository from '@modules/denunciations/repositories/IAddressesRepository';
import Address from '../entities/Address';

class AddressesRepository implements IAddressRepository {
  private ormRepository: Repository<Address>;

  constructor() {
    this.ormRepository = getRepository(Address);
  }

  public async create(date: ICreateAddressDTO): Promise<Address> {
    const address = this.ormRepository.create(date);

    await this.ormRepository.save(address);
    return address;
  }

  public async save(address: Address): Promise<Address> {
    return this.ormRepository.save(address);
  }

  public async delete(id: string): Promise<DeleteResult> {
    return this.ormRepository.delete(id);
  }
}
export default AddressesRepository;
