import { IPatientRepository } from "../../../patient/repositories/IPatientRepository";
import { inject, injectable } from "tsyringe";
import { ITokensRepository } from "../../repositories/ITokensRepository";
import { IDateProvider } from "../../../../shared/infra/container/providers/DateProvider/IDateProvider";
import auth from "../../../../config/auth";
import { AppError } from "../../../../shared/infra/errors/appError";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";


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
    private tokensRepository: ITokensRepository,
    @inject("DayJsDateProvider")
    private dateProvider: IDateProvider
  ){}

  async execute({email, password}: IRequest): Promise<IResponse>{
    const patient = await this.patientRepository.findByEmail(email)
    const {
      expires_in_token,
      secret_token,
      secret_refresh_token,
      expires_in_refresh_token,
      expires_refresh_token_days
    } = auth

    if(!patient){
      throw new AppError("Email or password incorrect.", )
    }

    const passwordMatch = await compare(password, patient.password)

    if(!passwordMatch){
      throw new AppError("Email or password incorrect.");
    }

    const token = sign({}, secret_token, {
      subject: patient.id,
      expiresIn: expires_in_token
    })

    const refresh_token = sign({ email }, secret_refresh_token, {
      subject: patient.id,
      expiresIn: expires_in_refresh_token
    })

    const refresh_token_expires_date = this.dateProvider.addDays(expires_refresh_token_days)

    await this.tokensRepository.create({
      expires_date:refresh_token_expires_date ,
      refresh_token: refresh_token,
      patient_id: patient.id
    })

    const tokenReturn: IResponse = {
      token,
      patient:{
        name: patient.name,
        email: patient.email
      },
      refresh_token
    }

    return tokenReturn

  }
}

export { AuthenticateUseCase}