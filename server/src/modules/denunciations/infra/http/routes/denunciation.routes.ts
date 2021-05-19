import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import DenunciationsController from '@modules/denunciations/infra/http/controllers/DenunciationsController';
import multer from 'multer';
import uploadConfig from '@config/upload';
import DenunciationsDayController from '../controllers/DenunciationsDayController';
import DenunciationsReportController from '../controllers/DenunciationsReportController';
import DenunciationsRangeDayController from '../controllers/DenunciationsRangeDayController';
import StatusController from '../controllers/StatusController';

const denunciationsRouters = Router();
const denunciationsController = new DenunciationsController();
const denunciationsDayController = new DenunciationsDayController();
const denunciationsReportController = new DenunciationsReportController();
const denunciationsRangeDayController = new DenunciationsRangeDayController();
const statusController = new StatusController();

denunciationsRouters.use(ensureAuthenticated);
const upload = multer(uploadConfig);

denunciationsRouters.post(
  '/',
  upload.single('photo'),
  denunciationsController.create,
);
denunciationsRouters.get('/all', denunciationsController.index);
denunciationsRouters.get('/', denunciationsDayController.index);

denunciationsRouters.get('/report', denunciationsReportController.index);

denunciationsRouters.get('/range', denunciationsRangeDayController.index);
denunciationsRouters.get('/my', denunciationsController.findByUser);
denunciationsRouters.get('/:id', denunciationsController.findById);

denunciationsRouters.delete('/:id', denunciationsController.delete);

denunciationsRouters.put('/status/:id', statusController.index);

export default denunciationsRouters;
