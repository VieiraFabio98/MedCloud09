import { AppError } from "../../../../shared/infra/errors/appError";
import { inject, injectable } from "tsyringe";
import { IPatientRepository } from "../../repositories/IPatientRepository";
import { hash } from "bcrypt";


interface IRequest{
  
  name: string,
  birth_date: string,
  email: string,
  address: string,
  password: string
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
    address,
    password
  }: IRequest): Promise<void>{

    const patientAlreadyExists = await this.patientRepository.findPatient(name)

    const passwordEncrypted = await hash(password, 8);

    if(patientAlreadyExists){
      throw new AppError("Patient already exists.")
    }

    await this.patientRepository.create({
      name,
      email,
      birth_date,
      address,
      password: passwordEncrypted
    })

  }
  
}

export { CreatePatientUseCase }