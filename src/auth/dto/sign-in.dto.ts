import { IsEmail } from 'class-validator';

export class SignInDto {
  /**
   * Email of the user
   * @example "admin@gmail.com"
   */
  @IsEmail()
  email: string;

  /**
   * Access token of the user
   * @example "123456789"
   */
  accessToken: string;
}
