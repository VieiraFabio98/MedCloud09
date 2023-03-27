import { Request, Response } from "express";
import { UpdatePatientUseCase } from "./UpdatePatientUseCase";
import { container } from "tsyringe";



class UpdatePatientController{

  async handle(request: Request, response: Response): Promise<Response>{
    const {name, email, address, birth_date} = request.body
    const { id } = request.params

    const updatePatientUseCase = container.resolve(UpdatePatientUseCase)
    const update = await updatePatientUseCase.execute({
      id,
      name,
      email,
      address,
      birth_date
    })

    return response.json(update)
  }

}

export { UpdatePatientController }