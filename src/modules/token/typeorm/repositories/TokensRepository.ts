import { ICreateTokenDTO } from "../../../../modules/token/DTO/ICreateToken";
import { ITokensRepository } from "modules/token/repositories/ITokensRepository";
import { getRepository, Repository } from "typeorm";
import { PatientTokens } from "../entities/PatientToken";



class TokensRepository implements ITokensRepository{

  private repository: Repository<PatientTokens>

  constructor(){
    this.repository = getRepository(PatientTokens)
  }
  
  async create({ expires_date, refresh_token, patient_id }: ICreateTokenDTO): Promise<PatientTokens> {
    const patientToken = this.repository.create({
      expires_date,
      refresh_token,
      patient_id
    })

    await this.repository.save(patientToken)

    return patientToken
  }

  async findByPatientIdAndRefreshToken(patient_id: string, refresh_token: string): Promise<PatientTokens> {
    const patientTokens = await this.repository.findOne({
      patient_id,
      refresh_token
    })

    return patientTokens
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id)
  }

  async findByRefreshToken(refresh_token: string): Promise<PatientTokens> {
    const patientToken = await this.repository.findOne({refresh_token})

    return patientToken
  }
  
}

export { TokensRepository }