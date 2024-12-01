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
  email: string;

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
}
