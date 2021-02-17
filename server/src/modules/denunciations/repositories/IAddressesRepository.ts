import Address from '../infra/typeorm/entities/Address';
import ICreateAddressDTO from '../dtos/ICreateAddressDTO'

export default interface IDenunciationsRepository {
  create(data: ICreateAddressDTO): Promise<Address>;
}
