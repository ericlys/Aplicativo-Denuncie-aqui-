import { Router } from 'express';
import UsersRepository from '@modules/users/infra/repositories/UsersRepository';

import AutenticateUserService from '@modules/users/services/AutenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;

    const usersRepository = new UsersRepository();
    const authenticateUser = new AutenticateUserService(usersRepository);

    const { user, token } = await authenticateUser.execute({
      email,
      password,
    });

    delete user.password;

    return response.json({ user, token });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default sessionsRouter;
