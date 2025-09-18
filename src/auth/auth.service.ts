import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDTO } from './dto/login-dto';
import { UsersService } from 'src/users/users.service';
import type HashServiceGeneratorInterface from 'src/shared/adpters/hash-generator.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    @Inject('hashService')
    private readonly hashService: HashServiceGeneratorInterface,
  ) {}

  async login({ email, password }: LoginDTO) {
    const user = await this.userService.findEmail(email);
    if (!user) throw new NotFoundException('user not found');
    const isValidPassword = await this.hashService.compareHash(
      password,
      user.passwordHash,
    );
    if (!isValidPassword) throw new UnauthorizedException('invalid password');
    try {
      const payLoad = {
        username: user.username,
        sub: user.id,
        role: user.role,
      };
      const token = await this.jwtService.signAsync(payLoad);
      return { token };
    } catch (err) {
      console.log(err);
    }
  }
}
