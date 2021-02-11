import IUsersRepository from '../repositories/IUsersRepository';

class CreateUserService {

  constructor(private usersRepository: IUsersRepository){}

  public async execute(token: string): Promise<boolean> {
    const checkUserExists = await this.usersRepository.findById(token);

    if (!checkUserExists) {
      throw new Error('Invalid token.');
    }

    await this.usersRepository.activate(token);

    return true;
  }
}

export default CreateUserService;
