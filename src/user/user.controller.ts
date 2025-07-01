import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // POST /users/register
  @Post('register')
  async create(@Body() createUserDto: UserDto) {
    return this.userService.createUser(createUserDto);
  }

  // GET /users
  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  // GET /users/by-email?email=test@example.com
  @Get('by-email')
  async findByEmail(@Query('email') email: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found with this email');
    }
    return user;
  }

  // GET /users/:id
  @Get(':id')
  async findById(@Param('id') id: string) {
    const user = await this.userService.findById(id);
    if (!user) {
      throw new NotFoundException('User not found with this ID');
    }
    return user;
  }
}
