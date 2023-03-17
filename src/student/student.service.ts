//necessary modules and classes are imported 
import { Injectable } from '@nestjs/common';
import { Student } from '../entities/Student';
import { InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import { CreateStudentDto } from './dto/createStudent.dto';
import { UpdateStudentDto } from './dto/updateStudent.dto';
import { mergeSortFM, mergeSortRD } from 'src/functions/sort';

@Injectable()
export class StudentService {
    //A repository is created for type Student 
    constructor(
    @InjectRepository(Student) private studentRepository: Repository<Student>,
    ){}
    //Promise is used to specify the return type
    getStudents(id):Promise<Student>{
        //this method returns student records for corresponding id
        return this.studentRepository.findOneBy({id});
    }

    async getAllStudents(type){
        if(type==1){
            //displays students in descending order of their weightedScore(0.7*gpa+0.3*attendance)
            const data= await this.studentRepository.find();
            const sortedArray=mergeSortFM(data);
            return sortedArray;
        }
        if(type==2){
            //displays students in ascending order of their registration_date
            const data= await this.studentRepository.find();
            const sortedArray=mergeSortRD(data);
            return sortedArray;
        }
        if(type==0){
            return await this.studentRepository.find();
        }
    }
    
    createStudents(studentDetails:CreateStudentDto){
        //this method is used to create student records in the db
        const newStudent= this.studentRepository.create({...studentDetails,createdAt:new Date()});
        this.studentRepository.save(newStudent);
        //this if condition checks if there is any value typed in the body if true perform create
        if(Object.keys(studentDetails).length>0){
            return newStudent;
        }
        else{
            return 1;
        }
    }
    
    async updateStudent(id:number, updateStudentDetails:UpdateStudentDto){ 
        //this method updates values of a record in the db
        this.studentRepository.update({ id } , {...updateStudentDetails,modifiedAt:new Date()});
        if(await this.studentRepository.countBy({id})>0){
            return this.studentRepository.findOneBy({id});
        }
        else{
            return 1;
        }
    }

    async deleteStudent(id){
        //this method deletes record from db based on id provided
        if(await this.studentRepository.countBy({id})>0){
            return this.studentRepository.delete({id});
        }
        else{
            return 1;
        }
    }
}
