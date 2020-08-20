import { Employee } from 'src/models/employee.entity';
import { EmployeeDto } from './../models/DTO/employee.dto';
import { EmployeeService } from './employee.service';
import { Controller, HttpException, HttpStatus, Get, Query } from '@nestjs/common';
import { Crud, Override, ParsedRequest, CrudRequest, ParsedBody } from '@nestjsx/crud';
import * as bcrypt from 'bcrypt';

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
export class EmployeeController {
  constructor(public service: EmployeeService) { }

  @Override()
  async createOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() employee: EmployeeDto
  ): Promise<Employee | any> {
    if (employee.password === employee.confirmPassword) {
      let hashed = await bcrypt.hash(employee.password, 10)
      employee.password = hashed;
      employee.isCustomPassword = true;
      return this.service.createOne(req, employee);
    } else {
      throw new HttpException('Senha e corfimação de senha não combinam!', HttpStatus.CONFLICT);
    }
  }
}