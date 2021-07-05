import { compare } from 'bcryptjs';
import path from 'path';
import { sign } from 'jsonwebtoken';

import User from '@modules/users/infra/typeorm/entities/User';
import authConfig from '@config/auth';
import { injectable, inject } from 'tsyringe';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

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
    private usersRepository: IUsersRepository,
    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const forgotPasswordEmailTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'autenticate_user.hbs',
    );

    if (!user.checked) {
      await this.mailProvider.sendMail({
        to: {
          name: user.name,
          email: user.email,
        },
        subject: '[DenuncieAqui] Recuperação de senha',
        templateData: {
          file: forgotPasswordEmailTemplate,
          variables: {
            name: user.name,
            link: `http://localhost:3333/users/activation/${user.id}`,
          },
        },
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
