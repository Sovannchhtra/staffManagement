
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class staff extends BaseEntity{
     @PrimaryGeneratedColumn()
     staffID!:string

     @Column()
     fullName!:string

     @Column({type:'date'})
     birthDay!:string

     @Column()
     gender!:number
}