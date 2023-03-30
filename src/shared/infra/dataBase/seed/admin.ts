import { v4 as uuidV4 } from "uuid";
import { hash } from "bcrypt";
import  createConnection  from "../index";

async function create() {

  const connection = await createConnection();

  const id = uuidV4();
  const password = await hash("admin", 8);

  await connection.query(
    `INSERT INTO patient(id,name,email,password,"is_admin",created_at,address, birth_date) 
    values ('${id}','admin','admin@medcloud.com','${password}',true,'now()','xxxx','yyyy')
    `
  )
}

create().then(() => console.log("User Admin created!"));