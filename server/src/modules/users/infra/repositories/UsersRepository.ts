import { getRepository, Repository} from 'typeorm';

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User from '../typeorm/entities/User';


class UsersRepository implements IUsersRepository{
  private ormRepository: Repository<User>;

  constructor(){
    this.ormRepository = getRepository(User);
  }
  
  
  public async create({name, email, cpf_num, password, administrator}: ICreateUserDTO): Promise<User> {
    
    const user = this.ormRepository.create({
      name,
      email,
      cpf: cpf_num,
      password,
      administrator,
    });
    
    await this.ormRepository.save(user);
    return user;
  }
  
  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }

  public async findByEmail(email: string): Promise<User | undefined>{
    const user = this.ormRepository.findOne({ where: { email }})
    return user;
  }
  
  public async findByCPF(cpf: string): Promise<User | undefined>{
    const user = this.ormRepository.findOne({ where: { cpf }})
    return user;
  }
  
  public async findById(id: string): Promise<User | undefined> {
    const user = this.ormRepository.findOne(id)
    return user;
  }
  
  public activate(id: string): void {
    this.ormRepository.update( id, { checked: true });
  }
  
}
export default UsersRepository;