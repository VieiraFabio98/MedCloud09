import { ITokensRepository } from "../../../modules/token/repositories/ITokensRepository";
import { TokensRepository } from "../../../modules/token/typeorm/repositories/TokensRepository";
import { container, delay } from "tsyringe";
import { IPatientRepository } from "../../../modules/patient/repositories/IPatientRepository";
import { PatientRepository } from "../../../modules/patient/typeorm/repositories/PatientRepository";
import { IDateProvider } from "./providers/DateProvider/IDateProvider";
import { DayJsDateProvider } from "./providers/DateProvider/implementations/DayJsDateProvider";


container.registerSingleton<IPatientRepository>(
  "PatientRepository",
  PatientRepository
)

container.registerSingleton<ITokensRepository>(
  "TokensRepository",
  TokensRepository
)

container.registerSingleton<IDateProvider>(
  "DayJsDateProvider",
  DayJsDateProvider
);