import { getRepository, Repository } from "typeorm"
import { ICreatePatientDTO } from "../../DTO/ICreatePatientDTO"
import { IPatientRepository } from "../../repositories/IPatientRepository"
import { Patient } from "../entities/Patient"



class PatientRepository implements IPatientRepository{
  
  private repository: Repository<Patient>

  constructor(){
    this.repository = getRepository(Patient)
  }
  
  async create({
    id,
    name, 
    birth_date, 
    email, 
    address
  }: ICreatePatientDTO): Promise<void> {
    
      const patient = this.repository.create({
        id,
        name,
        birth_date,
        email,
        address
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


}

export { PatientRepository }