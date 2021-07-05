import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateDenunciationService from '@modules/denunciations/services/CreateDenunciationService';
import ListDenunciationService from '@modules/denunciations/services/ListDenunciationService';
import ListUserDenunciationService from '@modules/denunciations/services/ListUserDenunciationService';
import findDenunciationService from '@modules/denunciations/services/FindDenunciationService';
import deleteDenunciationService from '@modules/denunciations/services/DeleteDenunciationService';

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

    let photoFilename = '';
    if (request.file) {
      photoFilename = request.file.filename;
    }

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

  public async findByUser(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const listUserDenunciations = container.resolve(
      ListUserDenunciationService,
    );
    const user_id = request.user.id;
    const denunciations = await listUserDenunciations.execute(user_id);
    return response.json(classToClass(denunciations));
  }

  public async findById(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;
    const findDenunciation = container.resolve(findDenunciationService);
    const denunciation = await findDenunciation.execute(id);
    return response.json(classToClass(denunciation));
  }

  public delete(request: Request, response: Response): Response {
    const { id } = request.params;
    const deleteDenunciation = container.resolve(deleteDenunciationService);
    deleteDenunciation.execute(id);
    return response.json({ status: 'ok' });
  }
}
