import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IHashprovider from '../providers/HashProvider/models/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';

import User from '../infra/typeorm/entities/User';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  cpf: string;
  old_password?: string;
  password?: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashprovider: IHashprovider,
  ) {}

  public async execute({
    user_id,
    name,
    email,
    cpf,
    old_password,
    password,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.');
    }

    const userWithUpdateEmail = await this.usersRepository.findByEmail(email);

    if (!userWithUpdateEmail && userWithUpdateEmail.id !== user_id) {
      throw new AppError('E-mail already in use.');
    }

    const userWithUpdateCPF = await this.usersRepository.findByCPF(cpf);

    if (!userWithUpdateCPF && userWithUpdateCPF.id !== user_id) {
      throw new AppError('CPF already in use.');
    }

    user.name = name;
    user.email = email;
    user.cpf = cpf;

    if (password && !old_password) {
      throw new AppError(
        'You need to inform the old password to set a new password',
      );
    }

    if (password && old_password) {
      const checkOldPassword = await this.hashprovider.compareHash(
        old_password,
        user.password,
      );

      if (!checkOldPassword) {
        throw new AppError('Old password does not match.');
      }
    }

    if (password) {
      user.password = await this.hashprovider.generateHash(password);
    }

    return this.usersRepository.save(user);
  }
}
export default UpdateProfileService;
