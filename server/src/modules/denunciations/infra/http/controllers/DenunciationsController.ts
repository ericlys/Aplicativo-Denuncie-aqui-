import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateDenunciationService from '@modules/denunciations/services/CreateDenunciationService';
import ListDenunciationService from '@modules/denunciations/services/ListDenunciationService';

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

    return response.json(classToClass(denunciation));
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listDenunciations = container.resolve(ListDenunciationService);
    const denunciations = await listDenunciations.execute();
    return response.json(classToClass(denunciations));
  }
}
