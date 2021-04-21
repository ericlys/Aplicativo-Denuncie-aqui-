import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateStatusService from '@modules/denunciations/services/UpdateStatusService';

export default class Statuscontroller {
  public async index(request: Request, response: Response): Promise<Response> {
    const { status } = request.body;
    const { id } = request.params;

    const UpdateStatus = container.resolve(UpdateStatusService);

    const denunciations = await UpdateStatus.execute({
      id: String(id),
      status: String(status),
    });

    return response.json(denunciations);
  }
}
