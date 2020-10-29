import { Router } from 'express';
import usersRouters from './user.routes';
import sessionsRouter from './sessions.routes';

const routes = Router();
routes.use('/users', usersRouters);
routes.use('/sessions', sessionsRouter);

export default routes;
