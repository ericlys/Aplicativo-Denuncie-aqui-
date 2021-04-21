import { getRepository, Repository, Raw } from 'typeorm';

import ICreateDenunciationDTO from '@modules/denunciations/dtos/ICreateDenunciationDTO';
import IDenunciationsRepository from '@modules/denunciations/repositories/IDenunciationsRepository';
import IFindAllInDayDTO from '@modules/denunciations/dtos/IFindAllInDayDTO';
import IPaginateDTO from '@modules/denunciations/dtos/IPaginateDTO';
import Denunciation from '../entities/Denunciation';

class DenunciationsRepository implements IDenunciationsRepository {
  private ormRepository: Repository<Denunciation>;

  constructor() {
    this.ormRepository = getRepository(Denunciation);
  }

  public async create({
    anonymous,
    description,
    hour,
    photo,
    status,
    title,
    user_id,
    category_id,
    address,
    userAnonymousId,
  }: ICreateDenunciationDTO): Promise<Denunciation> {
    const denunciation = this.ormRepository.create({
      anonymous,
      description,
      hour,
      photo,
      status,
      title,
      user: { id: user_id },
      category: { id: category_id },
      address,
      userAnonymousId,
    });

    await this.ormRepository.save(denunciation);
    return denunciation;
  }

  public async save(denunciation: Denunciation): Promise<Denunciation> {
    return this.ormRepository.save(denunciation);
  }

  public async index(): Promise<Denunciation[]> {
    return this.ormRepository.find();
  }

  public async findAllDay({
    day,
    month,
    year,
    page,
    totalPerPage,
  }: IFindAllInDayDTO): Promise<IPaginateDTO> {
    const parsedDay = String(day).padStart(2, '0');
    const parsedMonth = String(month).padStart(2, '0');

    const [denunciations, total] = await this.ormRepository.findAndCount({
      where: {
        hour: Raw(
          hourFieldName => `to_char(${hourFieldName},
              'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`,
        ),
      },
      take: totalPerPage,
      skip: totalPerPage * (page - 1),
    });

    return {
      data: denunciations,
      total,
    };
  }

  public async findAllDayByCategory({
    day,
    month,
    year,
    category_id,
    page,
    totalPerPage,
  }: IFindAllInDayDTO): Promise<IPaginateDTO> {
    const parsedDay = String(day).padStart(2, '0');
    const parsedMonth = String(month).padStart(2, '0');

    const [denunciations, total] = await this.ormRepository.findAndCount({
      where: {
        category: category_id,
        hour: Raw(
          hourFieldName => `to_char(${hourFieldName},
              'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`,
        ),
      },
      take: totalPerPage,
      skip: totalPerPage * (page - 1),
    });

    return {
      data: denunciations,
      total,
    };
  }

  public async findByUserId(id: string): Promise<Denunciation[]> {
    return this.ormRepository.find({ where: { user: id } });
  }

  public async findByUserAnonymousId(id: string): Promise<Denunciation[]> {
    return this.ormRepository.find({ where: { userAnonymousId: id } });
  }

  public async findById(id: string): Promise<Denunciation> {
    return this.ormRepository.findOne(id, {
      relations: ['address', 'category'],
    });
  }

  deleteById(id: string): void {
    this.ormRepository.delete(id);
  }
}

export default DenunciationsRepository;
