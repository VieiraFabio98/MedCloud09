import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../errors/appError";
import auth from "../../../config/auth";

interface IPayload{
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction){
    const authHeader = request.headers.authorization

    if(!authHeader){
      throw new AppError("Token missing", 401)
    }

    const [, token] = authHeader.split(" ")

    try{
      const { sub: patient_id } = verify(token, auth.secret_token) as IPayload

      request.patient = {
        id: patient_id
      }

      next()
    }catch{
      throw new AppError("Invalid Token", 401)
    }
  }
