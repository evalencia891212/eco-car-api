import {Router} from 'express'

import {getEmployees,createEmployee,updateEmployee,deleteEmployee,getEmployeesLatLng,getEmployeInfoVehicleByUser,getEmployeeByNumber,getEmployeeVehicleByNumber,getPassengerInfoVehicleByUser} from '../controllers/employees.controller.js'

const router = Router();

router.get('/employees', getEmployees)

router.get('/employees/empoyeeByNumber/:employee_number/:vehicle_id',getEmployeeByNumber)

router.get('/employees/empoyeeVehicleByNumber/:employee_number',getEmployeeVehicleByNumber)

router.post('/employees', createEmployee)

router.put('/employees/:employee_id', updateEmployee)

router.delete('/employees/:employee_id', deleteEmployee)

router.get('/employees/employeesLatLng',getEmployeesLatLng)

router.get('/employees/employeeInfo/:user_id',getEmployeInfoVehicleByUser)

router.get('/employees/getPassengerIngo/:user_id',getPassengerInfoVehicleByUser)







export default router