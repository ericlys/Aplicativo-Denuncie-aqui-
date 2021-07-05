import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListDenunciationsRangeDayService from '@modules/denunciations/services/ListDenunciationsRangeDayService';

export default class DenunciationsRangeDayController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { fromDay, fromMonth, fromYear, toDay, toMonth, toYear } = req.query;

    const ListDenunciationsDay = container.resolve(
      ListDenunciationsRangeDayService,
    );

    const denunciations = await ListDenunciationsDay.execute({
      fromDay: Number(fromDay),
      fromMonth: Number(fromMonth),
      fromYear: Number(fromYear),
      toDay: Number(toDay),
      toMonth: Number(toMonth),
      toYear: Number(toYear),
    });

    return res.json(denunciations);
  }
}
