import { sign } from 'jsonwebtoken';

import User from '@modules/users/infra/typeorm/entities/User';
import authConfig from '@config/auth';
import { injectable, inject } from 'tsyringe';
import { v4 } from 'uuid';
import ICacheUserAnonymous from '@shared/container/providers/CacheAnonymousUser/models/ICacheUserAnonymous';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  nickname: string;
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

    @inject('CacheUserAnonymous')
    private cacheUserAnonymous: ICacheUserAnonymous,
  ) {}

  public async execute({ nickname }: IRequest): Promise<IResponse> {
    const tempId = v4();

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: tempId,
      expiresIn,
    });

    const user = new User();

    user.id = tempId;
    user.name = nickname;

    await this.cacheUserAnonymous.save(tempId, user);

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
