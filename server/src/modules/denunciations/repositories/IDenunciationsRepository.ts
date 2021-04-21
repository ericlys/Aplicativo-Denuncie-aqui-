import Denunciation from '../infra/typeorm/entities/Denunciation';
import ICreateDenunciationDTO from '../dtos/ICreateDenunciationDTO';
import IFindAllInDayDTO from '../dtos/IFindAllInDayDTO';
import IPaginateDTO from '../dtos/IPaginateDTO';

export default interface IDenunciationsRepository {
  create(data: ICreateDenunciationDTO): Promise<Denunciation>;
  save(denunciation: Denunciation): Promise<Denunciation>;
  index(): Promise<Denunciation[]>;
  findAllDay(data: IFindAllInDayDTO): Promise<IPaginateDTO>;
  findAllDayByCategory(data: IFindAllInDayDTO): Promise<IPaginateDTO>;

  findByUserId(id: string): Promise<Denunciation[]> | undefined;
  findByUserAnonymousId(id: string): Promise<Denunciation[]> | undefined;
  findById(id: string): Promise<Denunciation>;

  deleteById(id: string): void;
}
