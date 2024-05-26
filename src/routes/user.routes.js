import {Router} from 'express'

import {getUser,getAvailableUserList,createUser} from '../controllers/user.controller.js'

const router = Router();

router.get('/user/:user_name/:password', getUser)
router.get('/availableUsers', getAvailableUserList)
router.post('/user/:employee_id', createUser)

export default router