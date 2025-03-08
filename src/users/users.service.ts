import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { UpdateUserDto } from './dtos/update-user.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { v4 as uuid } from 'uuid';
import { APP_NAME, USER_HABITS } from './user.constants';

@Injectable()
export class UsersService {
  constructor(
    @Inject(APP_NAME) private appName: string,
    @Inject(USER_HABITS) private userHabits: string[],
  ) {
    console.log(this.appName);
    console.log(this.userHabits);
  }

  private users: UserEntity[] = [];

  findUsers(): UserEntity[] {
    console.log(this.appName);
    console.log(this.userHabits);
    return this.users;
  }

  findUserById(id: string): UserEntity {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  createUser(createUserDto: CreateUserDto): UserEntity {
    const newUser: UserEntity = {
      ...createUserDto,
      id: uuid(),
    };

    this.users.push(newUser);

    return newUser;
  }

  updateUser(id: string, updateUserDto: UpdateUserDto): UserEntity {
    // 1) find element index that we want to update
    const index = this.users.findIndex((user) => user.id === id);

    // 2) update the element
    this.users[index] = { ...this.users[index], ...updateUserDto };

    return this.users[index];
  }

  deleteUser(id: string): { message: string } {
    const initialLength = this.users.length;

    this.users = this.users.filter((user) => user.id !== id);

    if (this.users.length === initialLength) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return { message: 'Deleted successfully' };
  }
}
