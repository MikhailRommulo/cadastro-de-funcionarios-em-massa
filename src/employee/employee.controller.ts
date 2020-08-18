import { Employee } from './../models/employee.entity';
import { EmployeeService } from './employee.service';
import { Controller } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';

@Crud({
  model: {
      type: Employee
  },
  params: {
      id: {
          field: 'id',
          type: 'uuid',
          primary: true
      }
  }
})
@Controller('employees')
export class EmployeeController{
  constructor(public service: EmployeeService) {}
}