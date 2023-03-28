import { ListPatientController } from '../../modules/patient/useCase/listPatient/ListPatientController'
import { Router } from 'express'
import { CreatePatientController } from '../../modules/patient/useCase/createPatient/CreatePatientController'
import { DeletePatientController } from '../../modules/patient/useCase/deletePatient/DeletePatientController'
import { UpdatePatientController } from '../../modules/patient/useCase/updatePatient/UpdatePatientController'
import { ensureAdmin } from '../infra/middlewares/ensureAdmin'


const patientRoutes = Router()

const createPatientController = new CreatePatientController()
const listPatientController = new ListPatientController()
const deletePatientController = new DeletePatientController()

const updatePatientController = new UpdatePatientController()

patientRoutes.post("/", createPatientController.handle)
patientRoutes.get("/", listPatientController.handle)
patientRoutes.delete("/:id", deletePatientController.handle)
patientRoutes.put("/:id", updatePatientController.handle)

export { patientRoutes }