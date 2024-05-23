import { createConnection } from "typeorm";
import { staff } from "../entity/staff.entity";

export const db = createConnection({
     type:'mysql',
     host:'localhost',
     port: 3306,
     username:'root',
     password:'',
     database:'staffmanage',
     entities:[staff],
     synchronize:true
}).then(()=>{
     console.log('Connection database successsfull');
}).catch(error => console.log(error));