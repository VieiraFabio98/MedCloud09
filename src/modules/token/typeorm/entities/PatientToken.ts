import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid"
import { Patient } from "../../../patient/typeorm/entities/Patient"


@Entity("tokens")
class PatientTokens{

  @PrimaryColumn()
  id?: string;

  @Column()
  patient_id: string;

  @ManyToOne(() => Patient)
  @JoinColumn({name: "patient_id"})
  patient: Patient

  @Column()
  refresh_token: string;

  @Column()
  created_at: Date

  @Column()
  expires_date: Date

  constructor(){
    if(!this.id){
      this.id = uuidV4()
    }
  }

}

export { PatientTokens }