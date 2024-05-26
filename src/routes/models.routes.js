import {Router} from 'express'
import { getModels,createModel, updateModel, deleteModel,getModelById } from '../controllers/models.controller.js';

const router = Router();


router.get('/models', getModels)

router.get('/models/modelById/:model_id', getModelById)


router.post('/models',  createModel)


router.put('/models/:model_id',  updateModel)

router.delete('/models/:model_id', deleteModel)

export default router