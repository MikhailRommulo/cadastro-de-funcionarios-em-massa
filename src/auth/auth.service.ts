import { TokenProps } from './../models/interfaces/token.interface';
import { AccessTokenProps } from './../models/interfaces/accessToken.interface';
import { Employee } from 'src/models/employee.entity';
import { EmployeeService } from './../employee/employee.service';
import { JwtService } from '@nestjs/jwt';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private employeeService: EmployeeService,
    private jwtService: JwtService
  ) {}

  async validateEmployee(
    employeeDocument: string,
    employeePassword: string
  ): Promise<Employee | null> {
    const employee = await this.employeeService.findOne({
      where: {
        document: employeeDocument
      }
    });

    const passwordTrue = await bcrypt.compare(employeePassword, employee.password);
    if(employee && passwordTrue) {
      return employee;
    }

    return null;
  }

  async login(employee: Employee): Promise<AccessTokenProps> {
    const payload = { document: employee.document, sub: employee.id};
    return {
      access_token: await this.jwtService.signAsync(payload)
    }
  }

  async refresh(token: string): Promise<AccessTokenProps | HttpException> {
    try {
      const tokenDecode = await this.jwtService.verifyAsync(token) as TokenProps;
      const payload = { document: tokenDecode.document, sub: tokenDecode.sub};
      return {
        access_token: await this.jwtService.signAsync(payload)
      }
    } catch (error) {
      throw new HttpException('Token inválido', HttpStatus.BAD_REQUEST);
    }
  }
}
