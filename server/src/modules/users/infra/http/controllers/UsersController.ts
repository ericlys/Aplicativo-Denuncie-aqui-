import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateUserService from '@modules/users/services/CreateUserService';
// import Mail from '@modules/users/infra/http/lib/Mail';

export default class UsersController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, email, cpf, password, administrator } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      email,
      cpf_num: cpf,
      password,
      administrator,
    });

    // await Mail.sendMail({
    //   to: user.email,
    //   subject: 'Confirmação de conta',
    //   html: `<a href="<a href="${process.env.APP_API_URL}/users/activation/${user.id}">Clique aqui para confirmar sua conta</a>`,
    // });

    return response.json(classToClass(user));
  }
}
