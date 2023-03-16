import { Entity,PrimaryGeneratedColumn,Column } from "typeorm";
@Entity({name:'Students'})
export class Student{
    @PrimaryGeneratedColumn({type:'bigint'})
    id:number;

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