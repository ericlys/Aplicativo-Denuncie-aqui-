import { Router } from 'express';
import usersRouters from './user.routes';

const routes = Router();
routes.use('/users', usersRouters);

export default routes;
