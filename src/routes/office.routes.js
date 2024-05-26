import {Router} from 'express'
import {getOffice } from '../controllers/office.controller.js';


const router = Router();

router.get('/office/', getOffice )

export default router