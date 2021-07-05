import { injectable, inject } from 'tsyringe';
import ICacheUserAnonymous from '@shared/container/providers/CacheAnonymousUser/models/ICacheUserAnonymous';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  user_id: string;
}

@injectable()
class InvalidateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CacheUserAnonymous')
    private cacheUserAnonymous: ICacheUserAnonymous,
  ) {}

  public async execute({ user_id }: IRequest): Promise<void> {
    await this.cacheUserAnonymous.invalidate(user_id);
  }
}

export default InvalidateUserService;
