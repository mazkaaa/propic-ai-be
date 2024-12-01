import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { GoogleOauthGuard } from './google-oauth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('google')
  @UseGuards(GoogleOauthGuard)
  auth() {}

  @Get('google/redirect')
  @UseGuards(GoogleOauthGuard)
  async googleAuthCallback(@Req() req, @Res() res: Response) {
    const userData: {
      email: string;
      firstName: string;
      lastName: string;
      picture: string;
      accessToken: string;
    } = req.user;
    const token = await this.authService.signIn(userData);

    res.cookie('access_token', token, {
      maxAge: 2592000000,
      sameSite: true,
      secure: false,
    });

    return res.json({
      email: userData.email,
      access_token: token.access_token,
    });
  }
}