import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserEntity } from './user.entity';
import { v4 as uuid } from 'uuid';

@Controller('users')
export class UsersController {
  private users: UserEntity[] = [];

  @Get()
  @HttpCode(HttpStatus.OK)
  findAllUsers(): UserEntity[] {
    return this.users;
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string): UserEntity {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  // @Post()
  // createUser(@Req() req: Request) {
  //   console.log(req.body);

  //   return 'Create User';
  // }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createUser(@Body() createUserDto: CreateUserDto): CreateUserDto {
    const newUser: UserEntity = {
      ...createUserDto,
      id: uuid(),
    };

    this.users.push(newUser);

    return newUser;
  }

  // Patch for update specific field in object
  // Put for update all object (To update specific field must send full object)
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): UpdateUserDto {
    // 1) find element index that we want to update
    const index = this.users.findIndex((user) => user.id === id);

    // 2) update the element
    this.users[index] = { ...this.users[index], ...updateUserDto };

    return this.users[index];
  }

  // @Delete(':username')
  // remove(@Param('username') username: string, @Res() res: Response): string {
  //   res.status(204).send();
  // }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): { message: string } {
    const initialLength = this.users.length;

    this.users = this.users.filter((user) => user.id !== id);

    if (this.users.length === initialLength) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return { message: 'Deleted successfully' };
  }
}
