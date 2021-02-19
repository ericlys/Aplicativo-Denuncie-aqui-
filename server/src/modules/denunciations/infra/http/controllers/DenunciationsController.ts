import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateDenunciationService from '@modules/denunciations/services/CreateDenunciationService';
import ActiveUserService from '@modules/users/services/ActiveUserService';

export default class DenunciationsController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const {
        anonymous,
        title,
        description,
        status,
        photo,
        user,
        address,
        hour,
      } = request.body;

      const CreateDenunciation = container.resolve(CreateDenunciationService);

      const denunciation = await CreateDenunciation.execute({
        anonymous,
        title,
        description,
        status,
        photo,
        user,
        address,
        hour,
      });

      return response.json(denunciation);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  public async index(request: Request, response: Response): Promise<Response> {
    try {
      const { token } = request.params;
      const activeUser = container.resolve(ActiveUserService);
      activeUser.execute(token);
      return response.status(200).send('usuario ativado');
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
