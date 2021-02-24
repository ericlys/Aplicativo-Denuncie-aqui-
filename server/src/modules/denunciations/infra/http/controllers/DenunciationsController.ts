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
      user_id,
      hour,
      category_id,
      address,
      city,
      complement,
      latitude,
      longitude,
      number,
      street,
      zipcode,
    } = request.body;

    const photoFilename = request.file.filename;

    const CreateDenunciation = container.resolve(CreateDenunciationService);

    const denunciation = await CreateDenunciation.execute({
      anonymous,
      title,
      description,
      status,
      user_id,
      hour,
      category_id,
      photoFilename,
      address,
      city,
      complement,
      latitude,
      longitude,
      number,
      street,
      zipcode,
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
