import {Router} from 'express'

import {getUser,getAvailableUserList,createUser,getUserByEmployeeId,updateUser} from '../controllers/user.controller.js'

const router = Router();

router.get('/user/:user_name/:password', getUser)
router.get('/availableUsers', getAvailableUserList)
router.get('/UserByEmployeeId/:employee_id',getUserByEmployeeId)
router.put('/user/',updateUser)
router.post('/user/:employee_id', createUser)

export default router