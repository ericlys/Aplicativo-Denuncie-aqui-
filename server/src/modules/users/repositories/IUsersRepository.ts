import User from '../infra/typeorm/entities/User';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

export default interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>;
  findByEmail(email: string): Promise<User>|undefined;
  findByCPF(cpf: string): Promise<User>|undefined;
  findById(id: string): Promise<User>|undefined;
  activate(id: string): void;
  save(user:User) : Promise<User>;
};
