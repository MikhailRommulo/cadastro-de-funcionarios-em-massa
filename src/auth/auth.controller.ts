import { AuthService } from './auth.service';
import {
  Controller,
  Post,
  UseGuards,
  Query,
  Request,
  HttpException
} from '@nestjs/common';
import { LocalAuthGuard } from './shared/localAuth.guard';
import { AllowAny } from '../custom-decorators/allowAny.decorator';
import { AccessTokenProps } from 'src/models/interfaces/accessToken.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('login')
  @AllowAny()
  @UseGuards(LocalAuthGuard)
  async login(@Request() req: any): Promise<AccessTokenProps> {
    return this.authService.login(req.user);
  }

  @Post('refresh')
  @AllowAny()
  async refreshToken(
    @Query('token') token: string
  ): Promise<AccessTokenProps | HttpException>{
    const tokenToRefresh = token;
    return this.authService.refresh(tokenToRefresh);
  }
}
