import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AutenticateAnonymouslyUserService from '@modules/users/services/AutenticateAnonymouslyUserService';
import InvalidateAnonymouslyUserService from '@modules/users/services/InvalidateAnonymouslyUserService';

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

  async invalidate(request: Request): Promise<void> {
    const user_id = request.user.id;

    const invalidateUser = container.resolve(InvalidateAnonymouslyUserService);

    await invalidateUser.execute({
      user_id,
    });
  }
}
