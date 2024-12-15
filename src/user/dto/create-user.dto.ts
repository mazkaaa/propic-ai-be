import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  /**
   * User email
   * @example "johndoe@gmail.com"
   */
  @IsEmail()
  @IsNotEmpty()
  email: string;

  /**
   * User password
   * @example "password"
   */
  @IsString()
  password: string;

  /**
   * Gender
   * @example 'male'
   */
  @IsNotEmpty()
  @IsString()
  gender: string;

  @IsDateString()
  birth_date: string;

  @IsBoolean()
  is_active: boolean;

  @IsNotEmpty()
  @IsBoolean()
  is_admin: boolean;

  @IsNotEmpty()
  @IsBoolean()
  is_use_google: boolean;
}
