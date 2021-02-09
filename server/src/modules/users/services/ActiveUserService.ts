import { getRepository } from 'typeorm';
import User from '@modules/users/infra/typeorm/entities/User';

class CreateUserService {
  public async execute(token: string): Promise<boolean> {
    const usersRepository = getRepository(User);

    const checkUserExists = await usersRepository.findOne({
      where: { id: token },
    });

    if (!checkUserExists) {
      throw new Error('Invalid token.');
    }

    await usersRepository.update({ id: token }, { checked: true });

    return true;
  }
}

export default CreateUserService;
