import { IsEmail, IsIn, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

 @IsString()
  @IsIn(['Admin', 'Viewer']) // validate only these roles
  role: string;
}
