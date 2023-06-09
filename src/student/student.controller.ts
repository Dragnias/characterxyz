//necessary modules and classes are imported from various files
import { Controller,Get,Post,Body, Param, ParseIntPipe, Res, HttpStatus  } from '@nestjs/common';
import { Delete, Patch } from '@nestjs/common/decorators';
import { Response } from 'express';
import { CreateStudentDto } from './dto/createStudent.dto';
import { UpdateStudentDto } from './dto/updateStudent.dto';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
    constructor(private studentService: StudentService){}
    @Get('id:id')
    //ParseIntPipe is used to checks if the given value is an integer if it's not an integer it converts it into an integer
    //Param decorator is used to define parameters
    //async is used to make a method asynchronous so that an empty set is not returned during method or function calls
    async getStudents(@Param('id',ParseIntPipe) id:number,@Res() res:Response){
        //displays the student according to its id 
        // await is a keyword which can only be used in async functions or classes it waits till a value is returned
        const data = await this.studentService.getStudents(id);
        if(data){
            const status=HttpStatus.OK+"  Ok";
            const Content_Type="application/json";
            res.send({status,Content_Type,data});
            //res.status(HttpStatus.NOT_FOUND).send(HttpStatus.NOT_FOUND+'  Not Found { "message": "Record not found" }');
        }
        else{
            res.status(HttpStatus.NOT_FOUND).send(HttpStatus.NOT_FOUND+'  Not Found { "message": "Record not found" }');
        } 
    }

    @Get()
    async getAllStudents(@Res() res:Response){
        //displays all students
        const data =await  this.studentService.getAllStudents(0);
        if(data){
            const status=HttpStatus.OK+"  Ok";
            const Content_Type="application/json";
            res.send({status,Content_Type,data});
        }
        else{
            res.status(HttpStatus.NOT_FOUND).send(HttpStatus.NOT_FOUND+'  Not Found { "message": "Record not found" }');
        }
    }

    @Get("weightedScore")
    async getAllStudents1(@Res() res:Response){
        //displays students in descending order of their weightedScore(0.7*gpa+0.3*attendance)
        const data = await this.studentService.getAllStudents(1);
        if(data){
            const status=HttpStatus.OK+"  Ok";
            const Content_Type="application/json";
            res.send({status,Content_Type,data});
        }
        else{
            res.status(HttpStatus.NOT_FOUND).send(HttpStatus.NOT_FOUND+'  Not Found { "message": "Record not found" }');
        }
    }

    @Get('registrationDate')
    async getAllStudents2(@Res() res:Response){
        //displays students in ascending order of their registration_date
        const data = await this.studentService.getAllStudents(2);
        if(data){
            const status=HttpStatus.OK+"  Ok";
            const Content_Type="application/json";
            res.send({status,Content_Type,data});    
        }
        else{
            res.status(HttpStatus.NOT_FOUND).send(HttpStatus.NOT_FOUND+'  Not Found { "message": "Record not found" }');
        }
    }
    
    @Post()
    createStudents(@Body() CreateStudentDto: CreateStudentDto,@Res() res:Response){
        //creates a student entity 
        const data=this.studentService.createStudents(CreateStudentDto);
        if(data==1){
            res.status(HttpStatus.BAD_REQUEST).send(HttpStatus.BAD_REQUEST+'   Bad Request { "message": "Invalid Request Body" }');
        }
        else{
            const status=HttpStatus.CREATED+"  Created";
            const Content_Type="application/json";
            res.send({status,Content_Type,data});
        }
        
    }

    @Patch(':id')
    async updateStudentById(@Param('id',ParseIntPipe)id:number,@Body() updateStudentDto:UpdateStudentDto,@Res() res:Response){
        //updates student entity according to id
        const data= await this.studentService.updateStudent(id,updateStudentDto);
        if(data==1){
            res.status(HttpStatus.NOT_FOUND).send(HttpStatus.NOT_FOUND+'  Not Found { "message": "Record not found" }');
        }
        else{
            const status=HttpStatus.OK+"  Ok";
            const Content_Type="application/json";
            res.send({status,Content_Type,data});
        }
    }

    @Delete(':id')
    async deleteStudentById(@Param('id',ParseIntPipe)id:number, @Res() res:Response){
        //deletes a student entity according to id 
        const data= await this.studentService.deleteStudent(id);
        if(data==1){
            res.status(HttpStatus.NOT_FOUND).send(HttpStatus.NOT_FOUND+'  Not Found { "message": "Record not found" }');
        }
        else{
            const status=HttpStatus.NO_CONTENT+"  No Content";
            res.send(status);
        }
    }
}
