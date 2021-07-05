import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListDenunciationsDayService from '@modules/denunciations/services/ListDenunciationsDayService';

export default class DenunciationsDayController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { day, month, year, category_id, page, totalPerPage } = req.query;

    const ListDenunciationsDay = container.resolve(ListDenunciationsDayService);

    const denunciations = await ListDenunciationsDay.execute({
      category_id: String(category_id),
      day: Number(day),
      month: Number(month),
      year: Number(year),
      page: Number(page),
      totalPerPage: Number(totalPerPage),
    });

    return res.json(denunciations);
  }
}
