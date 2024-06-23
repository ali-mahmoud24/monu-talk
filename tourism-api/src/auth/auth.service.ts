import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcryptjs';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role, User } from './user.entity';
import { UpdateUserInfoDto } from './dtos/update-user-info.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { GetUserInfoDto } from './dtos/get-user-info.dto';
import { UpdatePasswordDto } from './dtos/update-password.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,

    private cloudinaryService: CloudinaryService,

    // @InjectModel(User.name)
    // private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(
    registerDto: RegisterDto, // : Promise<{ token: string; id: string }>
  ) {
    const { firstName, lastName, email, password } = registerDto;

    // const { email, password } = signUpDto;

    const user = await this.userRepository.findOneBy({ email });
    if (user) {
      throw new UnauthorizedException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.userRepository.save({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: Role.CLIENT,
    });

    const token = this.jwtService.sign({ id: newUser.id });

    return { token, userId: newUser.id, imageUrl: newUser.imageUrl };
  }

  async login(
    loginDto: LoginDto, // : Promise<{ token: string; id: string }>
  ) {
    const { email, password } = loginDto;

    const loadedUser = await this.userRepository.findOneBy({ email });
    if (!loadedUser) {
      throw new UnauthorizedException('Invalid email or password.');
    }
    const isPasswordMatched = await bcrypt.compare(
      password,
      loadedUser.password,
    );
    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    const token = this.jwtService.sign({ id: loadedUser.id });

    return { token, userId: loadedUser.id, imageUrl: loadedUser.imageUrl };
  }

  async getUserInfo(userId: string): Promise<GetUserInfoDto> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    return {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      imageUrl: user.imageUrl,
      role: user.role,
    };
  }

  async updateUserInfo(
    userId: string,
    updateUserInfoDto: UpdateUserInfoDto,
  ): Promise<UpdateUserInfoDto> {
    // 1) find User to update
    const userToUpdate = await this.userRepository.findOne({
      where: { id: userId },
    });

    // 2) update the User
    const updatedUser = { ...userToUpdate, ...updateUserInfoDto };

    await this.userRepository.save(updatedUser);

    return {
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
    };
  }

  async updateUserImage(userId: string, image: Express.Multer.File) {
    // : Promise<Museum>

    // 1) find User to update
    const userToUpdate = await this.userRepository.findOne({
      where: { id: userId },
    });

    // 2) Check if the User already uploaded an image before
    if (userToUpdate.imageUrl) {
      // Delete the old photo
      await this.cloudinaryService.deleteFileByImageUrl(userToUpdate.imageUrl);
    }

    // 3) Upload the new Image
    if (image) {
      // Upload Image to Cloudinary
      const { url } = await this.cloudinaryService.uploadFile(image);
      userToUpdate.imageUrl = url;

      await this.userRepository.save(userToUpdate);
      return {
        imageUrl: url,
      };
    }
  }

  async updatePassword(
    userId: string,
    updatePasswordDto: UpdatePasswordDto, // : Promise<{ token: string; id: string }>
  ) {
    // 1) find User to update
    const userToUpdate = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!userToUpdate) {
      throw new UnauthorizedException('User not found.');
    }

    // 2) Hash the new User Password
    const { newPassword } = updatePasswordDto;
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // 3) update the User Password
    userToUpdate.password = hashedPassword;

    await this.userRepository.save(userToUpdate);

    return { message: 'Password updated Succesfully.' };
  }

  async getUserFullName(userId: string): Promise<string> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    const fullName = `${user.firstName} ${user.lastName}`;

    return fullName;
  }
}
