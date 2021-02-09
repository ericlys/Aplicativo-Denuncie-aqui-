import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import User from '@modules/users/infra/typeorm/entities/User';
import Mail from '@modules/users/infra/http/lib/Mail';
import authConfig from '@config/auth';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new Error('Incorrect email/password combination.');
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new Error('Incorrect email/password combination.');
    }

    if (!user.checked) {
      await Mail.sendMail({
        to: user.email,
        subject: 'Confirmação de conta',
        html: `<a href="<a href="http://localhost:3333/users/activation/${user.id}">Clique aqui para confirmar sua conta</a>, ou copie e colo o link no navegador: <a href="http://localhost:3333/users/activation/${user.id}">http://localhost:3333/users/activation/${user.id}</a>`,
      });
      throw new Error('Check email for account confirmation');
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
