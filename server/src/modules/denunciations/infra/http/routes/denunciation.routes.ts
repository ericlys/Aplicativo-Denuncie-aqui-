import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import DenunciationsController from '@modules/denunciations/infra/http/controllers/DenunciationsController';
import multer from 'multer';
import uploadConfig from '@config/upload';

const denunciationsRouters = Router();
const denunciationsController = new DenunciationsController();

denunciationsRouters.use(ensureAuthenticated);
const upload = multer(uploadConfig);

denunciationsRouters.post(
  '/',
  upload.single('photo'),
  denunciationsController.create,
);
denunciationsRouters.get('/activation/:token', denunciationsController.index);

export default denunciationsRouters;
