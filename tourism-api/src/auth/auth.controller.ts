import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';
import { UpdateUserInfoDto } from './dtos/update-user-info.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdatePasswordDto } from './dtos/update-password.dto';

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

  @Patch(':id')
  updateUserInfo(
    @Param('id', ParseUUIDPipe) id: string,
    @Body()
    updateUserInfoDto: UpdateUserInfoDto,
  ) {
    return this.authService.updateUserInfo(id, updateUserInfoDto);
  }

  @Patch('upload-image/:id')
  @UseInterceptors(FileInterceptor('image'))
  uploadUserImage(
    @Param('id', ParseUUIDPipe) id: string,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.authService.updateUserImage(id, image);
  }

  @Patch('change-password/:id')
  updatePassword(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    return this.authService.updatePassword(id, updatePasswordDto);
  }
}
