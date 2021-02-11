import Denunciation from '../infra/typeorm/entities/Denunciation';

export default interface IDenunciationsRepository {
  create(): Promise<Denunciation>;
  delete(denunciation: Denunciation): Promise<undefined>;
}
