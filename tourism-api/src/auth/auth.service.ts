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

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,

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

    return { token, userId: newUser.id };
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

    return { token, userId: loadedUser.id };
  }

  async getUserInfo(
    userId: string,
  ): Promise<{ firstName: string; lastName: string; email: string }> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    return {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };
  }

  async getUserFullName(userId: string): Promise<string> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    const fullName = `${user.firstName} ${user.lastName}`;

    return fullName;
  }
}
