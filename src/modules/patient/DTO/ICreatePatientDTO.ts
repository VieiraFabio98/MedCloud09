interface ICreatePatientDTO{
  id?: string;
  name: string;
  birth_date: string;
  email: string;
  address: string;
  password: string;
}

export { ICreatePatientDTO}