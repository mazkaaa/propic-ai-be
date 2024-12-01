import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { UserService } from 'src/user/user.service';

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
    try {
      const result = await this.userService.create({
        email: user.email,
        birth_date: '2000-01-01',
        gender: 'unspecified',
        is_active: true,
        is_admin: false,
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
