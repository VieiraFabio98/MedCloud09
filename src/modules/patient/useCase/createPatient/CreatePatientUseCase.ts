
import { AppError } from "../../../../shared/infra/errors/appError";
import { inject, injectable } from "tsyringe";

import { IPatientRepository } from "../../repositories/IPatientRepository";




interface IRequest{
  
  name: string,
  birth_date: string,
  email: string,
  address: string
}

@injectable()
class CreatePatientUseCase{

  constructor(
    @inject("PatientRepository")
    private patientRepository: IPatientRepository
  ){}

  async execute({
    
    name,
    email,
    birth_date,
    address
  }: IRequest): Promise<void>{

    const patientAlreadyExists = await this.patientRepository.findPatient(name)

    if(patientAlreadyExists){
      throw new AppError("Patient already exists.")
    }

    await this.patientRepository.create({
      name,
      email,
      birth_date,
      address
    })

  }
  
}

export { CreatePatientUseCase }