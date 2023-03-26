import { container, delay } from "tsyringe";
import { IPatientRepository } from "../../../modules/patient/repositories/IPatientRepository";
import { PatientRepository } from "../../../modules/patient/typeorm/repositories/PatientRepository";


container.registerSingleton<IPatientRepository>(
  "PatientRepository",
  delay(() => PatientRepository)
)