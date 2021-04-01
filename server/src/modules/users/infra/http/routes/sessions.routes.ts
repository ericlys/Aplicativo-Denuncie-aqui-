import { Router } from 'express';

import SessionsController from '../controllers/SessionsController';
import SessionsAnonymouslyController from '../controllers/SessionsAnonymouslyController';

const sessionsRouter = Router();
const sessionsController = new SessionsController();
const sessionsAnonymouslyController = new SessionsAnonymouslyController();

sessionsRouter.post('/', sessionsController.create);
sessionsRouter.post('/anonymously', sessionsAnonymouslyController.create);
sessionsRouter.post(
  '/anonymously/invalidate',
  sessionsAnonymouslyController.invalidate,
);

export default sessionsRouter;
