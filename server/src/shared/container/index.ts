import { container } from 'tsyringe';

import './providers';

import '@modules/users/providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokenRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import IDenunciationsRepository from '@modules/denunciations/repositories/IDenunciationsRepository';
import DenunciationsRepository from '@modules/denunciations/infra/typeorm/repositories/DenunciationsRepository';

import IAddressesRepository from '@modules/denunciations/repositories/IAddressesRepository';
import AddressesRepository from '@modules/denunciations/infra/typeorm/repositories/AddressesRepository';

import ICategoriesRepository from '@modules/denunciations/repositories/ICategoriesRepository';
import CategoriesRepository from '@modules/denunciations/infra/typeorm/repositories/CategoriesRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IDenunciationsRepository>(
  'DenunciationsRepository',
  DenunciationsRepository,
);

container.registerSingleton<IAddressesRepository>(
  'AddressesRepository',
  AddressesRepository,
);

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokenRepository',
  UserTokenRepository,
);
