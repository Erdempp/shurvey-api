import { Controller, UseGuards, Get, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { CurrentUser } from './user.decorator';
import { User } from './schemas/user.schema';

@UseGuards(AuthGuard())
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('current')
  async getCurrentUser(@CurrentUser() user: User) {
    return this.userService.getById(user.id);
  }

  @Get(':id')
  async getUser(@CurrentUser() user: User, @Param('id') id: string) {
    // Check if user == currentUser
    return this.userService.getById(id);
  }

  @Get()
  async getAllUsers() {
    const users = await this.userService.getAll();
    return users
      ? users.map(
          u =>
            new User({
              // _id: u._id,
              // email: u.email,
              displayName: u.displayName,
              score: u.score,
            }),
        )
      : undefined;
  }
}
