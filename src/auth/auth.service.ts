import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { User } from 'src/user/schemas/user.schema';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { constants } from './constants';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.getByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async register(dto: RegisterUserDto) {
    const hashedPassword = await bcrypt.hash(
      dto.password,
      constants.bcryptRounds,
    );
    dto.password = hashedPassword;
    const user = await this.userService.create(dto);
    const { password, ...result } = user;
    return result;
  }

  async login(user: Omit<User, 'id' | 'displayName'>) {
    const payload = { userId: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
