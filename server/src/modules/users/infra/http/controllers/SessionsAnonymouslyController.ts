import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AutenticateAnonymouslyUserService from '@modules/users/services/AutenticateAnonymouslyUserService';

export default class SessionsAnonymouslyController {
  async create(request: Request, response: Response): Promise<Response> {
    const { nickname } = request.body;

    const authenticateUser = container.resolve(
      AutenticateAnonymouslyUserService,
    );

    const { user, token } = await authenticateUser.execute({
      nickname,
    });

    return response.json({ user: classToClass(user), token });
  }
}
