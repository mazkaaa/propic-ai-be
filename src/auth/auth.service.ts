import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { UserService } from 'src/user/user.service';
import { scryptSync, randomBytes, timingSafeEqual } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(user: SignInDto) {
    if (!user) {
      throw new BadRequestException('User payload not found!');
    }
    const userIsExisted = await this.userService.findOneByEmail(user.email);
    if (!userIsExisted) {
      throw new BadRequestException('User not found!');
    }
    const salt = randomBytes(16).toString('hex');
    const hashedPassword = scryptSync(user.password, salt, 64).toString('hex');
    const isPasswordMatched = timingSafeEqual(
      Buffer.from(hashedPassword),
      Buffer.from(userIsExisted.password),
    );
    if (!isPasswordMatched) {
      throw new BadRequestException('Invalid authentication credentials!');
    }
    const payload = {
      sub: userIsExisted.id,
      email: userIsExisted.email,
    };
    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET,
      }),
    };
  }

  async signInGoogle(user: SignInDto) {
    if (!user) {
      throw new BadRequestException('User payload not found!');
    }
    const userIsExisted = await this.userService.findOneByEmail(user.email);
    if (!userIsExisted) {
      return this.register(user);
    }
    const payload = {
      sub: userIsExisted.id,
      email: userIsExisted.email,
    };
    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET,
      }),
    };
  }

  async register(user: SignUpDto) {
    const salt = randomBytes(16).toString('hex');
    const hashedPassword = scryptSync(user.password, salt, 64).toString('hex');

    try {
      const result = await this.userService.create({
        email: user.email,
        birth_date: '2000-01-01',
        gender: 'unspecified',
        is_active: true,
        is_admin: false,
        is_use_google: false,
        password: hashedPassword,
      });
      const payload = {
        sub: result.id,
        email: result.email,
      };
      return {
        access_token: await this.jwtService.signAsync(payload, {
          secret: process.env.JWT_SECRET,
        }),
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
