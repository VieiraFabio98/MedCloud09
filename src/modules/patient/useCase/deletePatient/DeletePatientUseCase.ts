import { Patient } from "@modules/patient/typeorm/entities/Patient";
import { PatientRepository } from "../../typeorm/repositories/PatientRepository"
import { inject, injectable } from "tsyringe";



@injectable()
class DeletePatientUseCase {
  constructor(
    @inject("PatientRepostory")
    private patientRepository: PatientRepository
  ){}

  async execute(id: string): Promise<Patient>{
    const patient = await this.patientRepository.deletePatient(id)

    return patient
  }
}

export { DeletePatientUseCase }