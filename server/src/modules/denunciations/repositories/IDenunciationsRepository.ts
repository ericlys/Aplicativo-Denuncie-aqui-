import Denunciation from '../infra/typeorm/entities/Denunciation';
import ICreateDenunciationDTO from '../dtos/ICreateDenunciationDTO';

export default interface IDenunciationsRepository {
  create(data: ICreateDenunciationDTO): Promise<Denunciation>;
  save(denunciation: Denunciation): Promise<Denunciation>;
  index(): Promise<Denunciation[]>;
  findByUserId(id: string): Promise<Denunciation[]> | undefined;
}
