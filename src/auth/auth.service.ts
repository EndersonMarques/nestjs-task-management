import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

import { AuthCredentials } from './auth-credentials.dto';
import { JwtPayload } from './jwt-payload.interface';
import { UserRepository } from './users.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentials: AuthCredentials): Promise<void> {
    return this.userRepository.createUser(authCredentials);
  }

  async signIn(
    authCredentials: AuthCredentials,
  ): Promise<{ accessToken: string }> {
    const { username, password } = authCredentials;

    const user = await this.userRepository.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { username };

      const accessToken = await this.jwtService.sign(payload);

      return {
        accessToken,
      };
    } else {
      throw new UnauthorizedException('Por favor cheque suas credenciais');
    }
  }
}
