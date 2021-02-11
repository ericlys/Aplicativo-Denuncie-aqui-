import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import User from '@modules/users/infra/typeorm/entities/User';
import Mail from '@modules/users/infra/http/lib/Mail';
import authConfig from '@config/auth';
import IUsersRepository from '../repositories/IUsersRepository';
import { injectable, inject } from 'tsyringe';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

@injectable()
class AuthenticateUserService {

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,){}

  public async execute({ email, password }: IRequest): Promise<IResponse> {

    const user = await this.usersRepository.findByEmail(email);

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
