import {Router} from 'express'
import { createVehicle, 
         getVehicles,
         deleteVehicle,
         updateVehicle,
         getAvailableVehicles,
         getVehiclesByRoute,
         createVehicleEmployee,
         getVehicleEmployeeTour,
         removeVehicleEmployeeTour,
         openIssue,
         closeIssue,
         getIssue } from '../controllers/vehicles.controller.js';

const router = Router();


router.get('/vehicles', getVehicles)

router.get('/vehicles/availables', getAvailableVehicles)

router.get('/vehicles/byRoute/:route_id', getVehiclesByRoute)

router.post('/vehicles',  createVehicle)

router.post('/vehicles/vehicleEmployee',  createVehicleEmployee)

router.post('/vehicles/removeVehicleEmployee',removeVehicleEmployeeTour)

router.get('/vehicles/vehicleEmployee/:vehicle_id',getVehicleEmployeeTour)

router.put('/vehicles/:vehicle_id', updateVehicle)

router.delete('/vehicles/:vehicle_id', deleteVehicle)

router.post('/vehicles/issue', openIssue)

router.get('/vehicles/issue/:vehicle_id', getIssue)

router.delete('/vehicles/issue/:vehicle_id/:vehicle_issue_id', closeIssue)


export default router