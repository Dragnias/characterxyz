import { Controller,Get,Post,Body, Param, ParseIntPipe, Res, HttpStatus  } from '@nestjs/common';
import { Delete, Patch } from '@nestjs/common/decorators';
import { Response } from 'express';
import { CreateStudentDto } from './dto/createStudent.dto';
import { UpdateStudentDto } from './dto/updateStudent.dto';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
    constructor(private studentService: StudentService){}
    @Get(':id')
    getStudents(@Param('id',ParseIntPipe) id:number){
        return this.studentService.getStudents(id); 
    }

    @Get()
    getAllStudents(){
        return this.studentService.getAllStudents();
    }
    
    @Post()
    createStudents(@Body() CreateStudentDto: CreateStudentDto,@Res() res:Response,){
        const data=this.studentService.createStudents(CreateStudentDto);
        if(data==1){
            res.status(HttpStatus.BAD_REQUEST).send(HttpStatus.BAD_REQUEST+'   Bad Request');
        }
        else{
            const status=HttpStatus.CREATED+"  Created";
            res.send({status,data});
        }
        
    }

    @Patch(':id')
    async updateStudentById(@Param('id',ParseIntPipe)id:number,@Body() updateStudentDto:UpdateStudentDto,@Res() res:Response){
        const data= await this.studentService.updateStudent(id,updateStudentDto);
        if(data==1){
            res.status(HttpStatus.NOT_FOUND).send(HttpStatus.NOT_FOUND+'  Not Found');
        }
        else{
            const status=HttpStatus.OK+"  Ok";
            res.send({status,data});
        }
    }

    @Delete(':id')
    async deleteStudentById(@Param('id',ParseIntPipe)id:number, @Res() res:Response){
        const data= await this.studentService.deleteStudent(id);
        if(data==1){
            res.status(HttpStatus.NOT_FOUND).send(HttpStatus.NOT_FOUND+'  Not Found');
        }
        else{
            const status=HttpStatus.NO_CONTENT+"  No Content";
            res.send(status);
        }
    }
}
