import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';
import Mail from '@modules/users/infra/http/lib/Mail';

export default class UsersController {
  async create(request: Request, response: Response): Promise<Response> {
    try {
      const { name, email, cpf, password, administrator } = request.body;

      const createUser = container.resolve(CreateUserService);

      const user = await createUser.execute({
        name,
        email,
        cpf_num: cpf,
        password,
        administrator,
      });

      await Mail.sendMail({
        to: user.email,
        subject: 'Confirmação de conta',
        html: `<a href="<a href="http://localhost:3333/users/activation/${user.id}">Clique aqui para confirmar sua conta</a>`,
      });

      delete user.password;

      return response.json(user);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
