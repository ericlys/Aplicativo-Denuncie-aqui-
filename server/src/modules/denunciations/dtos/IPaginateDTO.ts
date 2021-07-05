import Denunciation from '../infra/typeorm/entities/Denunciation';

export default interface IPaginateDTO {
  data: Denunciation[];
  total: number;
}
