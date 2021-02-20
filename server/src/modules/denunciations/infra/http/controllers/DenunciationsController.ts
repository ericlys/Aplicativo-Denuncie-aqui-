import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateDenunciationService from '@modules/denunciations/services/CreateDenunciationService';
import ActiveUserService from '@modules/users/services/ActiveUserService';

export default class DenunciationsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      anonymous,
      title,
      description,
      status,
      photo,
      user_id,
      address,
      hour,
      category_id,
    } = request.body;

    const CreateDenunciation = container.resolve(CreateDenunciationService);

    const denunciation = await CreateDenunciation.execute({
      anonymous,
      title,
      description,
      status,
      photo,
      user_id,
      address,
      hour,
      category_id,
    });

    return response.json(denunciation);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { token } = request.params;
    const activeUser = container.resolve(ActiveUserService);
    activeUser.execute(token);
    return response.status(200).send('usuario ativado');
  }
}
