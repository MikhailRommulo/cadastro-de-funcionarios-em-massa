import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): any {
    return {
      version: '1.0.0',
      description: 'Sistema para cadastro de funcionários em massa'
    };
  }
}
