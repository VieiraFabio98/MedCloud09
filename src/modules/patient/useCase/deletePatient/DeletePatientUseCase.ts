import { Patient } from "../../typeorm/entities/Patient"
import { IPatientRepository } from "../../repositories/IPatientRepository"
import { inject, injectable } from "tsyringe";



@injectable()
class DeletePatientUseCase {
  constructor(
    @inject("PatientRepository")
    private patientRepository: IPatientRepository
  ){}

  async execute(id: string): Promise<Patient>{
    const patient = await this.patientRepository.deletePatient(id)

    return patient
  }
}

export { DeletePatientUseCase }