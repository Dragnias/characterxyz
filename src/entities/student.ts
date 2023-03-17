//necessary decorators are imported from typeorm module for creation of table
import { Entity,PrimaryGeneratedColumn,Column } from "typeorm";
//Entity decorator defines the table name
@Entity({name:'Students'})
export class Student {
    //PrimaryGeneratedColumn defines the primary key with auto increment
    @PrimaryGeneratedColumn({type:'bigint'})
    id:number;
    //Column decorator defines the columns of the table
    @Column()
    name:string;
    
    @Column()
    age:number;
    
    @Column()
    major:string;
    
    @Column({type:'float'})
    gpa:number;
    
    @Column({type:'float'})
    attendance:number;
    
    @Column()
    registration_date:Date;
    
    @Column({default:null})
    createdAt:Date;
    
    @Column({default:null})
    modifiedAt:Date;
}
