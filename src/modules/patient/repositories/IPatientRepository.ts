import { Patient } from "../typeorm/entities/Patient";
import { ICreatePatientDTO } from "../DTO/ICreatePatientDTO";

interface IPatientRepository{
  create(data: ICreatePatientDTO): Promise<void>
  findPatient(name: string, id?: string): Promise<Patient>
  listPatients(): Promise<Patient[]>
  deletePatient(id: string): Promise<Patient>
  updatePatient(data: ICreatePatientDTO): Promise<Patient>
  findById(id: string): Promise<Patient>
}

export { IPatientRepository}