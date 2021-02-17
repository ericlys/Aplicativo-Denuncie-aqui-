import {container} from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import IDenunciationsRepository from '@modules/denunciations/repositories/IDenunciationsRepository';
import DenunciationsRepository from '@modules/denunciations/infra/typeorm/repositories/DenunciationsRepository';
import IAddressesRepository from '@modules/denunciations/repositories/IAddressesRepository';
import AddressesRepository from '@modules/denunciations/infra/typeorm/repositories/AddressesRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository', 
  UsersRepository
  );

  container.registerSingleton<IDenunciationsRepository>(
  'DenunciationsRepository', 
  DenunciationsRepository
  );
  
  container.registerSingleton<IAddressesRepository>(
  'AddressesRepository', 
  AddressesRepository
  );