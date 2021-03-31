import { container } from 'tsyringe';

import ICacheUserAnonymous from './models/ICacheUserAnonymous';

import RedisCacheUserAnonymous from './implementations/RedisCacheUserAnonymous';

const usersAnonimous = {
  redis: RedisCacheUserAnonymous,
};

container.registerSingleton<ICacheUserAnonymous>(
  'CacheUserAnonymous',
  usersAnonimous.redis,
);
