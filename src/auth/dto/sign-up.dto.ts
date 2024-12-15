import { IsEmail, IsString } from 'class-validator';

export class SignUpDto {
  /**
   * Email of the user
   * @example "admin@gmail.com"
   */
  @IsEmail()
  email: string;

  /**
   * Password of the user
   * @example "password"
   */
  @IsString()
  password: string;
}
