import {Router} from 'express'
import {getRoutes,createRoute,updateRoute,deleteRoute } from '../controllers/routes.controller.js';

const router = Router();

router.get('/routes', getRoutes)

router.post('/routes',createRoute  )

router.put('/routes/:route_id', updateRoute)

router.delete('/routes/:route_id',deleteRoute )

export default router