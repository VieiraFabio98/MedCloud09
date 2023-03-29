import { PatientTokens } from "../typeorm/entities/PatientToken"
import { ICreateTokenDTO } from "../DTO/ICreateToken"

interface ITokensRepository{
  create({
    expires_date,
    refresh_token,
    patient_id
  }:ICreateTokenDTO) :Promise<PatientTokens>

  findByPatientIdAndRefreshToken(patient_id: string, refresh_token: string): Promise<PatientTokens>;

  deleteById(id: string): Promise<void>;

  findByRefreshToken(refresh_token: string): Promise<PatientTokens>

}

export { ITokensRepository }