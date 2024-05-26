import {Router} from 'express'
import {getStations,createStation, updateStation,deleteStation, getStationsSequenceByRoute, updateSequence,getStationsByRoute } from '../controllers/stations.controller.js';

const router = Router();

router.get('/stations', getStations )

router.post('/stations',createStation  )

router.put('/stations/:station_id',updateStation )

router.get('/stations/:route_id', getStationsSequenceByRoute )

router.get('/stations/byRoute/:route_id', getStationsByRoute )

router.delete('/stations/:station_id',deleteStation )

router.put('/stations/sequence/:route_id',updateSequence)

export default router