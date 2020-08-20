import { Employee } from 'src/models/employee.entity';
import { AuthService } from '../auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

  constructor(private authService: AuthService) {
    super({
      usernameField: 'document',
      passwordField: 'password'
    });
  }

  async validate(document: string, password: string): Promise<Employee | UnauthorizedException> {
    const employee = await this.authService.validateEmployee(document, password)
    if (!employee) {
      throw new UnauthorizedException('documento ou senha desconhecidos!')
    }
    return employee;
  }
}