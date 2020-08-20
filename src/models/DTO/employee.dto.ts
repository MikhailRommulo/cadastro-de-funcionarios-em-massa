import { Employee } from 'src/models/employee.entity';

export class EmployeeDto extends Employee {
  confirmPassword: string;
}