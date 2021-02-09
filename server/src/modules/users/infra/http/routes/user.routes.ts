import { Router } from 'express';
import CreateUserService from '@modules/users/services/CreateUserService';
import ActiveUserService from '@modules/users/services/ActiveUserService';
import Mail from '@modules/users/infra/http/lib/Mail';

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
      html: `<a href="<a href="http://localhost:3333/users/activation/${user.id}">Clique aqui para confirmar sua conta</a>`,
    });

    delete user.password;

    return response.json(user);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

usersRouters.get('/activation/:token', async (request, response) => {
  try {
    const { token } = request.params;
    const activeUser = new ActiveUserService();
    activeUser.execute(token);
    return response.status(200).send('usuario ativado');
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default usersRouters;
