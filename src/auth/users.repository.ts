import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { EntityRepository, Repository } from 'typeorm';

import { AuthCredentials } from './auth-credentials.dto';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(authCredentials: AuthCredentials): Promise<void> {
    const { username, password } = authCredentials;

    const salt = await bcrypt.genSalt();

    const hasedPassword = await bcrypt.hash(password, salt);

    console.log('salt', salt);
    console.log('hashedPassword', hasedPassword);

    const user = this.create({ username, password: hasedPassword });

    try {
      await this.save(user);
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException('Username já existe');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
