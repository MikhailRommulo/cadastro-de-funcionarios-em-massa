import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Injectable } from '@nestjs/common';
import { Employee } from 'src/models/employee.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EmployeeService extends TypeOrmCrudService<Employee>{
  constructor(@InjectRepository(Employee) repo) {
    super(repo);
  }
}
