import { IsEmail } from 'class-validator';

export class SignUpDto {
  /**
   * Email of the user
   * @example "admin@gmail.com"
   */
  @IsEmail()
  email: string;
}
