import { ListPatientController } from '../../modules/patient/useCase/listPatient/ListPatientController'
import { Router } from 'express'
import { CreatePatientController } from '../../modules/patient/useCase/createPatient/CreatePatientController'
import { DeletePatientController } from '../../modules/patient/useCase/deletePatient/DeletePatientController'
import { UpdatePatientController } from '../../modules/patient/useCase/updatePatient/UpdatePatientController'
import { ensureAdmin } from '../infra/middlewares/ensureAdmin'
import { ensureAuthenticated } from '../../shared/infra/middlewares/ensureAuthenticated'




const patientRoutes = Router()

const createPatientController = new CreatePatientController()
const listPatientController = new ListPatientController()
const deletePatientController = new DeletePatientController()
const updatePatientController = new UpdatePatientController()

patientRoutes.post("/", ensureAuthenticated, ensureAdmin, createPatientController.handle)

patientRoutes.get("/", ensureAuthenticated, ensureAdmin, listPatientController.handle)

patientRoutes.delete("/:id", ensureAuthenticated, ensureAdmin, deletePatientController.handle)

patientRoutes.put("/:id", ensureAuthenticated, ensureAdmin, updatePatientController.handle)

export { patientRoutes }