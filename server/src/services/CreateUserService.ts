import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import { cpf } from 'cpf-cnpj-validator';
import User from '../models/User';

interface Request {
  name: string;
  email: string;
  cpf_num: string;
  password: string;
  administrator: boolean;
}

class CreateUserService {
  public async execute({
    name,
    email,
    cpf_num,
    password,
    administrator = false,
  }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const checkUserExists = await usersRepository.findOne({
      where: { email },
    });

    if (checkUserExists) {
      throw new Error('Email address already used.');
    }

    const checkCpf = cpf.isValid(cpf_num);
    if (!checkCpf) {
      throw new Error('Invalid CPF.');
    }

    const checkCpfExists = await usersRepository.findOne({
      where: { cpf: cpf.format(cpf_num) },
    });

    if (checkCpfExists) {
      throw new Error('Cpf already used.');
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      cpf: cpf.format(cpf_num),
      password: hashedPassword,
      administrator,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
