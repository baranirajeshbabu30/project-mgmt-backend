import { IsEmail, IsIn, IsString, MinLength } from 'class-validator';

export class UserDto {
  @IsString()
  username: string;



  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

    @IsString()
  @IsIn(['Admin', 'Viewer']) // validate only these roles
  role: string;

}
