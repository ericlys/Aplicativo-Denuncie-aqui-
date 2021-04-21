import { injectable, inject } from 'tsyringe';
import IDenunciationsRepository from '../repositories/IDenunciationsRepository';

import IPaginateDTO from '../dtos/IPaginateDTO';

interface IRequest {
  day: number;
  month: number;
  year: number;
  category_id?: string;
  page: number;
  totalPerPage: number;
}

@injectable()
class ListDenunciationsDayService {
  constructor(
    @inject('DenunciationsRepository')
    private denunciationsRepository: IDenunciationsRepository,
  ) {}

  public async execute({
    day,
    year,
    month,
    category_id,
    page,
    totalPerPage,
  }: IRequest): Promise<IPaginateDTO> {
    let denunciations;

    if (category_id === 'undefined' || category_id === '') {
      denunciations = await this.denunciationsRepository.findAllDay({
        day,
        month,
        year,
        page,
        totalPerPage,
      });
    } else {
      denunciations = await this.denunciationsRepository.findAllDayByCategory({
        day,
        month,
        year,
        category_id,
        page,
        totalPerPage,
      });
    }
    return denunciations;
  }
}

export default ListDenunciationsDayService;
