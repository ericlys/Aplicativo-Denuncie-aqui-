import { Router } from 'express';
import usersRouters from '@modules/users/infra/http/routes/user.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import denunciationRouter from '@modules/denunciations/infra/http/routes/denunciation.routes';
import categoryRouter from '@modules/denunciations/infra/http/routes/category.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';

const routes = Router();
routes.use('/users', usersRouters);
routes.use('/sessions', sessionsRouter);
routes.use('/denunciation', denunciationRouter);
routes.use('/category', categoryRouter);
routes.use('/profile', profileRouter);

export default routes;
