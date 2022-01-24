import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthCredentials } from './auth-credentials.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signUup')
  signUp(@Body() authCredentials: AuthCredentials): Promise<void> {
    return this.authService.signUp(authCredentials);
  }
  @Post('signin')
  signIn(@Body() authCredentials: AuthCredentials): Promise<Object> {
    return this.authService.signIn(authCredentials);
  }

  @Post('/test')
  @UseGuards(AuthGuard())
  test(@Req() req) {
    return req.user;
  }
}
