import { ListPatientController } from '../modules/patient/useCase/listPatient/ListPatientController'
import { Router } from 'express'
import { CreatePatientController } from '../modules/patient/useCase/createPatient/CreatePatientController'
import { DeletePatientController } from '../modules/patient/useCase/deletePatient/DeletePatientController'


const patientRoutes = Router()

const createPatientController = new CreatePatientController()
const listPatientController = new ListPatientController()
const deletePatientcontroller = new DeletePatientController()

patientRoutes.post("/", createPatientController.handle)
patientRoutes.get("/", listPatientController.handle)
patientRoutes.delete("/:id", deletePatientcontroller.handle)

export { patientRoutes }