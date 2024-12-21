import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, type userDocument } from 'src/users/schema/user.schema';
import { UsersService } from 'src/users/users.service';
import { SignupDto } from './dto/signUp.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    @InjectModel(User.name) private readonly userModel: Model<userDocument>,
  ) {}

  async checkExistingUser(email: string): Promise<userDocument> {
    const isExistUser = await this.userModel.findOne({ email }).select('_id');

    return isExistUser;
  }

  async create(signUpDto: SignupDto): Promise<userDocument> {
    const createUser = new this.userModel(signUpDto);
    return createUser.save();
  }

  async signIn(userName: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(userName);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    // const { _password, ...result } = user;
    // TODO: Generate a JWT and return it here
    // const payload = { sub: user.userId, userName: user.username };
    // instead of the user object
    return {
      // access_token: await this.jwtService.signAsync(payload),
      access_token: 'abcd',
    };
  }
}
