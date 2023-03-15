import { Injectable } from '@nestjs/common';
import { student } from '../entities/student';
import { InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import { CreateStudentDto } from './dto/createStudent.dto';
import { UpdateStudentDto } from './dto/updateStudent.dto';

@Injectable()
export class StudentService {
    constructor(
    @InjectRepository(student) private studentRepository: Repository<student>,
    ){}
    getStudents(id):Promise<student>{
        return this.studentRepository.findOneBy({id});
    }

    getAllStudents(){
        return this.studentRepository.find();
    }
    createStudents(studentDetails:CreateStudentDto){
        const newStudent= this.studentRepository.create({...studentDetails,createdAt:new Date()});
        this.studentRepository.save(newStudent);
        if(Object.keys(studentDetails).length>0){
            return newStudent;
        }
        else{
            return 1;
        }
    }
    
    async updateStudent(id:number, updateStudentDetails:UpdateStudentDto){ 
        this.studentRepository.update({ id } , {...updateStudentDetails,modifiedAt:new Date()});
        if(await this.studentRepository.countBy({id})>0){
            return this.studentRepository.findOneBy({id});
        }
        else{
            return 1;
        }
    }

    async deleteStudent(id){
        if(await this.studentRepository.countBy({id})>0){
            return this.studentRepository.delete({id});
        }
        else{
            return 1;
        }
    }
}
