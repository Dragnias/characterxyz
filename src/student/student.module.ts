import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { TypeOrmModule} from '@nestjs/typeorm';
import { student } from '../entities/student';
@Module({
  imports:[TypeOrmModule.forFeature([student])],
  controllers: [StudentController],
  providers: [StudentService]
})
export class StudentModule {}
