import { IPatientRepository } from "../../../modules/patient/repositories/IPatientRepository";
import { inject, injectable } from "tsyringe";
import { ITokensRepository } from "../repositories/ITokensRepository";


interface IRequest{
  email: string;
  password: string;
}

interface IResponse {
  patient: {
    name: string;
    email: string;
  }
  token: string;
  refresh_token: string;
}

@injectable()
class AuthenticateUseCase {

  constructor(
    @inject("PatientRepository")
    private patientRepository: IPatientRepository,
    @inject("TokensRepository")
    private tokensRepository: ITokensRepository
  ){}


}