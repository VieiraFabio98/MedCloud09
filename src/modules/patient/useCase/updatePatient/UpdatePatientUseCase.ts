import { IPatientRepository } from "../../repositories/IPatientRepository"
import { inject, injectable } from "tsyringe"
import { Patient } from "../../typeorm/entities/Patient"



interface IRequest{
  id: string,
  name: string,
  email: string,
  address: string,
  birth_date: string
}

@injectable()
class UpdatePatientUseCase {

  constructor(
    @inject("PatientRepository")
    private patientRepository: IPatientRepository
  ){}

  async execute({
    id,
    name,
    email,
    address,
    birth_date
  }: IRequest): Promise<Patient>{
    const patient = await this.patientRepository.updatePatient({
      id,
      name,
      email,
      address,
      birth_date
    }).then(patientupdated => {
      return patientupdated
    }).catch(error => {
      return error
    })

    return patient

  }
}

export { UpdatePatientUseCase }