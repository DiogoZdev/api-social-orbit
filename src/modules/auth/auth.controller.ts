import { Body, Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IUserLogin } from './types/login.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('login')
  signIn(@Body() data: IUserLogin) {
    return this.authService.signIn(data);
  }
}
