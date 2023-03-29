import { ITokensRepository } from "../../../../modules/token/repositories/ITokensRepository";
import { inject, injectable } from "tsyringe";
import { IDateProvider } from "../../../../shared/infra/container/providers/DateProvider/IDateProvider";
import auth from "../../../../config/auth";
import { sign, verify } from "jsonwebtoken";
import { AppError } from "../../../../shared/infra/errors/appError";



interface IPayload{
  sub: string;
  email: string;
}

interface ITokenResponse{
  token: string;
  refresh_token: string;
}

@injectable()
class RefreshTokenUseCase{

  constructor(
    @inject("TokensRepository")
    private tokensRepository: ITokensRepository,
    @inject("DaysDateProvider")
    private dateProvider: IDateProvider
  ){}

  async execute(token: string): Promise<ITokenResponse>{
    const { email, sub } = verify(token, auth.secret_token) as IPayload

    const patient_id = sub;

    const patientToken = await this.tokensRepository.findByPatientIdAndRefreshToken(patient_id, token)

    if(!patientToken){
      throw new AppError("Refresh Token does not exists!")
    }

    await this.tokensRepository.deleteById(patientToken.id)

    const refresh_token = sign({email}, auth.secret_refresh_token, {
      subject: sub,
      expiresIn: auth.expires_in_refresh_token
    })

    const expires_date = this.dateProvider.addDays(auth.expires_refresh_token_days)

    await this.tokensRepository.create({
      expires_date,
      refresh_token,
      patient_id
    })

    const newToken = sign({}, auth.secret_token, {
      subject: patient_id,
      expiresIn: auth.expires_in_token,
    })

    return {
      refresh_token,
      token: newToken
    }
  }

}

export { RefreshTokenUseCase }