import Address from '../infra/typeorm/entities/Address';

export default interface ICreateDenunciationDTO {
  anonymous: boolean;
  title: string;
  description: string;
  photo: string | null;
  status: string;
  hour: Date;
  user_id: string;
  category_id: string;
  address: Address;
  userAnonymousId: string;
}
