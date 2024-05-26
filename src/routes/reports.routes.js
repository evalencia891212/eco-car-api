import {Router} from 'express'

import {getCO2ByEmployees,getToursInfo} from '../controllers/reports.controller.js'

const router = Router();

router.get('/reports/globalCo2', getCO2ByEmployees)
router.get('/reports/getToursInfo', getToursInfo)

export default router