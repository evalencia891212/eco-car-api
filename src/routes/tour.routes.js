import {Router} from 'express'
import {addEmployee, endTour, removeEmployee, startTour,getOpenTour,getOpenTourBoarding,confirmTourBoarding,startExternalTour} from '../controllers/tours.controller.js';

const router = Router();
router.post('/tours',startTour )
router.post('tours/externalTours/:employee_id',startExternalTour)
router.put('/tours',endTour )
router.post('/tourDetail',addEmployee )
router.get('/tours/openTour/:veicle_route_id',getOpenTour)
router.get('/tours/tourBoarding/:employee_id',getOpenTourBoarding)
router.put('/tours/confirmTour/:tour_detail_id',confirmTourBoarding)
//router.post('/tours/tour_detail/',removeEmployee )

export default router