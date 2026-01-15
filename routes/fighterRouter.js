import { Router } from 'express';
import fighterController from '../controllers/fighterController.js';
import { fighterValidationRules, fighterValidate } from '../validators/fighterValidator.js';
import upload from '../middlewares/upload.js';

const fighterRouter = Router();

fighterRouter.get('/', fighterController.indexGet);
fighterRouter.get('/create', fighterController.createGet);
fighterRouter.post(
  '/create',
  upload.single('image_url'), fighterValidationRules, fighterValidate,
  fighterController.createPost
); 
fighterRouter.post('/delete/:id', fighterController.deletePost);

export default fighterRouter;
