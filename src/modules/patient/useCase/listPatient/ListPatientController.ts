import { Request, Response } from "express";
import { ListPatientUseCase } from "./ListPatientUseCase";
import { container } from "tsyringe";

class ListPatientController{

  async handle(request: Request, response: Response): Promise<Response>{
    const listPatientUseCase = container.resolve(ListPatientUseCase)
    const all = await listPatientUseCase.execute()
    return response.json(all)
  }
}

export { ListPatientController }