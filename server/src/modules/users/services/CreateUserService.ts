import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
import { injectable, inject } from 'tsyringe';

import { cpf } from 'cpf-cnpj-validator';
import { hash } from 'bcryptjs';

interface IRequest {
  name: string;
  email: string;
  cpf_num: string;
  password: string;
  administrator: boolean;
}

@injectable()
class CreateUserService {

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    ){}

  public async execute({
    name,
    email,
    cpf_num,
    password,
    administrator = false,
  }: IRequest): Promise<User> {

    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new Error('Email address already used.');
    }

    const checkCpf = cpf.isValid(cpf_num);
    if (!checkCpf) {
      throw new Error('Invalid CPF.');
    }

    const checkCpfExists = await this.usersRepository.findByCPF(cpf.format(cpf_num));

    if (checkCpfExists) {
      throw new Error('Cpf already used.');
    }

    const hashedPassword = await hash(password, 8);
    const user = await this.usersRepository.create({
      name,
      email,
      cpf_num: cpf.format(cpf_num),
      password: hashedPassword,
      administrator,
    });


    return user;
  }
}

export default CreateUserService;
