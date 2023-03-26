import { IPatientRepository } from "../../repositories/IPatientRepository";
import { Patient } from "../../typeorm/entities/Patient";
import { inject, injectable } from "tsyringe";

@injectable()
class ListPatientUseCase{

  constructor(
    @inject("PatientRepository")
    private patientRepository: IPatientRepository
  ){}

  async execute(): Promise<Patient[]>{
    const patients = await this.patientRepository.listPatients()

    return patients
  }
}

export { ListPatientUseCase }