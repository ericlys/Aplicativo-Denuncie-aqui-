import Denunciation from '../infra/typeorm/entities/Denunciation';
import ICreateDenunciationDTO from '../dtos/ICreateDenunciationDTO';

export default interface IDenunciationsRepository {
  create(data: ICreateDenunciationDTO): Promise<Denunciation>;
  save(denunciation: Denunciation): Promise<Denunciation>;
}
