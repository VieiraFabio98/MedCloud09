import { AppError } from "../../../../shared/infra/errors/appError"
import { getRepository, Repository } from "typeorm"
import { ICreatePatientDTO } from "../../DTO/ICreatePatientDTO"
import { IPatientRepository } from "../../repositories/IPatientRepository"
import { Patient } from "../entities/Patient"


class PatientRepository implements IPatientRepository{
  
  private repository: Repository<Patient>

  constructor(){
    this.repository = getRepository(Patient)
  }

  async updatePatient({
    id,
    name,
    address,
    email,
    birth_date,
    password
  }:ICreatePatientDTO): Promise<Patient> {
    const patient = await this.repository.findOne(id)

    if(!patient){
      console.log("patient not found")
    }

    const patientUpdate = this.repository.create({
      id,
      name,
      address,
      email,
      birth_date,
      password
    })

    await this.repository.save(patientUpdate)

    return patientUpdate
     
  }
  
  async create({
    id,
    name, 
    birth_date, 
    email, 
    address,
    password
  }: ICreatePatientDTO): Promise<void> {
    
      const patient = this.repository.create({
        id,
        name,
        birth_date,
        email,
        address,
        password
      })

      await this.repository.save(patient)
  }

  async findPatient(name: string, id?: string): Promise<Patient>{
    const patient = await this.repository.findOne({name})
    return patient
  }

  async listPatients(): Promise<Patient[]> {
    const patients = await this.repository.find()
    return patients
  }

  async deletePatient(id: string): Promise<any> {
    return await this.repository.delete(id);
   
  }

  async findById(id: string): Promise<Patient>{
    const patient = await this.repository.findOne(id)
    return patient
  }

  async findByEmail(email: string): Promise<Patient>{
    const patient = await this.repository.findOne({email})

    return patient
  }

}

export { PatientRepository }


