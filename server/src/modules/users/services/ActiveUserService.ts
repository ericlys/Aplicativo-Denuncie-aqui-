import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(token: string): Promise<boolean> {
    const checkUserExists = await this.usersRepository.findById(token);

    if (!checkUserExists) {
      throw new AppError('Invalid token.', 401);
    }

    await this.usersRepository.activate(token);

    return true;
  }
}

export default CreateUserService;
