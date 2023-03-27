import { ListPatientController } from '../modules/patient/useCase/listPatient/ListPatientController'
import { Router } from 'express'
import { CreatePatientController } from '../modules/patient/useCase/createPatient/CreatePatientController'
import { DeletePatientController } from '../modules/patient/useCase/deletePatient/DeletePatientController'
import { UpdatePatientController } from '../modules/patient/useCase/updatePatient/UpdatePatientController'


const patientRoutes = Router()

const createPatientController = new CreatePatientController()
const listPatientController = new ListPatientController()
const deletePatientcontroller = new DeletePatientController()

const updatePatientcontroller = new UpdatePatientController()

patientRoutes.post("/", createPatientController.handle)
patientRoutes.get("/", listPatientController.handle)
patientRoutes.delete("/:id", deletePatientcontroller.handle)
patientRoutes.put("/:id", updatePatientcontroller.handle)

export { patientRoutes }