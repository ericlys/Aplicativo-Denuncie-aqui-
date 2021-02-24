import { container } from 'tsyringe';
import IStorageProvider from './StorageProviders/model/IStorageProvider';
import DiskStorageProvider from './StorageProviders/implementations/DiskStorageProvider';

const providers = {
  disk: DiskStorageProvider,
};

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  providers.disk,
);
