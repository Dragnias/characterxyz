import { Injectable } from '@nestjs/common';
import { Student } from '../entities/Student';
import { InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import { CreateStudentDto } from './dto/createStudent.dto';
import { UpdateStudentDto } from './dto/updateStudent.dto';
import { mergeSort } from 'src/functions/sort';

@Injectable()
export class StudentService {
    constructor(
    @InjectRepository(Student) private studentRepository: Repository<Student>,
    ){}
    getStudents(id):Promise<Student>{
        return this.studentRepository.findOneBy({id});
    }

    async getAllStudents(){
        //displays students in descending order of their weightedScore(0.7*gpa+0.3*attendance)
        const data= await this.studentRepository.find();
        const sortedArray=mergeSort(data);
        return sortedArray;
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
