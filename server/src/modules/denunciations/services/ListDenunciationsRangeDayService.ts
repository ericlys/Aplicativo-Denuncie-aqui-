import { injectable, inject } from 'tsyringe';
import Denunciation from '../infra/typeorm/entities/Denunciation';
import IDenunciationsRepository from '../repositories/IDenunciationsRepository';

interface IRequest {
  fromDay: number;
  fromMonth: number;
  fromYear: number;
  toDay: number;
  toMonth: number;
  toYear: number;
}

@injectable()
class ListDenunciationsRangeDayService {
  constructor(
    @inject('DenunciationsRepository')
    private denunciationsRepository: IDenunciationsRepository,
  ) {}

  public async execute({
    fromDay,
    fromMonth,
    fromYear,
    toDay,
    toMonth,
    toYear,
  }: IRequest): Promise<Denunciation[]> {
    const denunciations = await this.denunciationsRepository.findByRangeDay({
      fromDay,
      fromMonth,
      fromYear,
      toDay,
      toMonth,
      toYear,
    });

    return denunciations;
  }
}
export default ListDenunciationsRangeDayService;
