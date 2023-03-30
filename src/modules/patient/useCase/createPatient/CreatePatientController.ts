import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreatePatientUseCase } from "./CreatePatientUseCase";

class CreatePatientController{
  async handle(request: Request, response: Response): Promise<Response>{
    const { name, birth_date, email, address, password } = request.body
    const createPatientUsecase = container.resolve(CreatePatientUseCase)
    await createPatientUsecase.execute({
      name, 
      birth_date,
      email,
      address,
      password
    })

    return response.status(201).json()
  }
}

export { CreatePatientController };