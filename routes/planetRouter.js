import { Router } from 'express';
import planetController from '../controllers/planetController.js';
import { planetValidationRules, planetValidate } from '../validators/planetValidator.js';

const planetRouter = Router();

planetRouter.get('/', planetController.indexGet);
planetRouter.get('/create', planetController.createGet);
planetRouter.post('/create', planetValidationRules, planetValidate, planetController.createPost);
planetRouter.post('/delete/:id', planetController.deletePost);

export default planetRouter;
