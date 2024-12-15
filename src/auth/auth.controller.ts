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
    const token = await this.authService.signInGoogle({
      email: userData.email,
      accessToken: userData.accessToken,
      password: '',
    });

    res.cookie('access_token', token, {
      maxAge: 2592000000,
      sameSite: true,
      secure: false,
    });

    res.redirect(
      'http://localhost:3001' + '/auth/google?token=' + token.access_token,
    );
  }
}
