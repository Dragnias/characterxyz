import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { TypeOrmModule} from '@nestjs/typeorm';
import { Student } from '../entities/student';
@Module({
  //typeorm module is imported for student entity
  imports:[TypeOrmModule.forFeature([Student])],
  controllers: [StudentController],
  providers: [StudentService]
})
export class StudentModule {}
