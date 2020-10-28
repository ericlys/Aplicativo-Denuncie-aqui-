import { Router } from 'express';
import Mail from '../lib/Mail';
import CreateUserService from '../services/CreateUserService';

const usersRouters = Router();

usersRouters.post('/', async (request, response) => {
  try {
    const { name, email, cpf, password, administrator } = request.body;

    const createUser = new CreateUserService();

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
      html: `<a href="http://localhost:3333/confirm?user=${user.id}">Clique aqui para confirmar sua conta</a>`,
    });

    delete user.password;

    return response.json(user);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default usersRouters;
