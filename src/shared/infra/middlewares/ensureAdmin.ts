import { PatientRepository } from "../../../modules/patient/typeorm/repositories/PatientRepository";
import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/appError";


export async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
){
  const { id } = request.user
  const patientRepository = new PatientRepository
  const admin = await patientRepository.findById(id)

  if(!admin.is_admin){
    throw new AppError("User isn't admin")
  }

}