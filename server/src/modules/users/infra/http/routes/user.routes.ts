import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import UsersController from '../controllers/UsersController';
import UserActivationController from '../controllers/UserActivationController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import UserAvatarController from '../controllers/UserAvatarController';

const usersRouters = Router();
const upload = multer(uploadConfig);

const usersController = new UsersController();
const userActivationController = new UserActivationController();
const userAvatarController = new UserAvatarController();

usersRouters.post('/', usersController.create);
usersRouters.get('/activation/:token', userActivationController.update);
usersRouters.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarController.update,
);
export default usersRouters;
