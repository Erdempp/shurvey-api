import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { ReturnModelType } from '@typegoose/typegoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly user: ReturnModelType<typeof User>,
  ) {}

  async create(user: Omit<User, '_id' | 'id'>) {
    const createdUser = await this.user.create(user);
    return createdUser ? new User(createdUser.toObject()) : undefined;
  }

  async getById(id: User['id']) {
    const user = await this.user.findById(id);
    return user ? new User(user.toObject()) : undefined;
  }

  async getByEmail(email: User['email']) {
    const user = await this.user.findOne({ email });
    return user ? new User(user.toObject()) : undefined;
  }
}
