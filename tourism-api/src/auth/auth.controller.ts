import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  signUp(@Body() registerDto: RegisterDto): Promise<{ token: string }> {
    return this.authService.signUp(registerDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    return this.authService.login(loginDto);
  }

  @Get(':id')
  getUserInfo(@Param('id', ParseUUIDPipe) id: string) {
    return this.authService.getUserInfo(id);
  }
}
