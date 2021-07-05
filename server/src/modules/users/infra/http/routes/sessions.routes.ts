import { Router } from 'express';

import SessionsController from '../controllers/SessionsController';
import SessionsAnonymouslyController from '../controllers/SessionsAnonymouslyController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const sessionsRouter = Router();
const sessionsController = new SessionsController();
const sessionsAnonymouslyController = new SessionsAnonymouslyController();

sessionsRouter.post('/', sessionsController.create);
sessionsRouter.post('/anonymously', sessionsAnonymouslyController.create);

sessionsRouter.post(
  '/anonymously/invalidate',
  ensureAuthenticated,
  sessionsAnonymouslyController.invalidate,
);

export default sessionsRouter;
