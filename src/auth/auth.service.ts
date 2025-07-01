import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
import { UserDto } from 'src/user/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  private async validateUser(email: string, password: string, role: string) {
    const user = await this.userService.findByEmail(email);

    if (
      user &&
      user.role === role &&
      (await bcrypt.compare(password, user.password))
    ) {
      const { password, ...result } = user.toJSON?.() || user;
      return result;
    }

    return null;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(
      loginDto.email,
      loginDto.password,
      loginDto.role,
    );

    if (!user) {
      throw new UnauthorizedException('Invalid email, password, or role');
    }

    const payload = {
      sub: user._id,
      email: user.email,
      role: user.role,
    };

    return {
      message: 'Login successful',
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  async signup(userDto: UserDto) {
    const existingUser = await this.userService.findByEmail(userDto.email);
    if (existingUser) {
      throw new ConflictException('User already exists with this email');
    }

    const newUser = await this.userService.createUser(userDto);
    const { password, ...userWithoutPassword } = newUser.toJSON?.() || newUser;

    return {
      message: 'Signup successful',
      user: userWithoutPassword,
    };
  }
}
