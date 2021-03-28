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
denunciationsRouters.get('/', denunciationsController.index);
denunciationsRouters.get('/my', denunciationsController.findByUser);
denunciationsRouters.get('/:id', denunciationsController.findById);
denunciationsRouters.delete('/:id', denunciationsController.delete);

export default denunciationsRouters;
