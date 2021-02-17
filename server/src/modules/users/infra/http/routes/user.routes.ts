import { Router } from 'express';

import UsersController from '../controllers/UsersController';
import UserActivationController from '../controllers/UserActivationController';

const usersRouters = Router();
const usersController= new UsersController();
const userActivationController= new UserActivationController();

usersRouters.post('/', usersController.create);
usersRouters.get('/activation/:token', userActivationController.update);

export default usersRouters;
