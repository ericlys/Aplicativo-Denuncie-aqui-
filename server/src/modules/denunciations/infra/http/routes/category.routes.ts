import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import CategoriesController from '@modules/denunciations/infra/http/controllers/CategoriesController';

import multer from 'multer';
import uploadConfig from '@config/upload';

const cateroriesRouters = Router();
const cateroriesController = new CategoriesController();

cateroriesRouters.use(ensureAuthenticated);
const upload = multer(uploadConfig);

cateroriesRouters.post('/', upload.single('icon'), cateroriesController.create);
cateroriesRouters.get('/', cateroriesController.index);
cateroriesRouters.delete('/:id', cateroriesController.delete);

export default cateroriesRouters;
