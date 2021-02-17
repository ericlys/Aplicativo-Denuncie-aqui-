import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import DenunciationsController from '@modules/denunciations/infra/http/controllers/DenunciationsController';

const denunciationsRouters = Router();
const denunciationsController = new DenunciationsController();

denunciationsRouters.use(ensureAuthenticated);

denunciationsRouters.post('/', denunciationsController.create);
denunciationsRouters.get('/activation/:token', denunciationsController.index)

export default denunciationsRouters;
