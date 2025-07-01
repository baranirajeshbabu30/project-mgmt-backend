import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './schemas/user.schema';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  // Create a new user with hashed password and generated user ID
  async createUser(dto: UserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const newUser = new this.userModel({
      ...dto,
      password: hashedPassword,
    });
    return newUser.save();
  }

  // Find a user by email
  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  // Find a user by MongoDB _id
  async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

  // Retrieve all users
  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
}
