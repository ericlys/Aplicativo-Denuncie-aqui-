import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import CategoriesController from '@modules/denunciations/infra/http/controllers/CategoriesController';

const cateroriesRouters = Router();
const cateroriesController = new CategoriesController();

cateroriesRouters.use(ensureAuthenticated);

cateroriesRouters.post('/', cateroriesController.create);

export default cateroriesRouters;
