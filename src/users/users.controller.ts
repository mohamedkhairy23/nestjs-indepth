import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserEntity } from './user.entity';
import { CustomValidationPipe } from './pipes/validation.pipe';
import { UsersService } from './users.service';

@Controller('users')
// @UsePipes(ValidationPipe)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAllUsers(
    @Query('username', CustomValidationPipe) username: string,
  ): UserEntity[] {
    return this.usersService.findUsers();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(
    @Param('id', ParseUUIDPipe)
    id: string,
  ): UserEntity {
    return this.usersService.findUserById(id);
  }

  // @Post()
  // createUser(@Req() req: Request) {
  //   console.log(req.body);

  //   return 'Create User';
  // }

  // @Post()
  // @HttpCode(HttpStatus.CREATED)
  // createUser(
  //   @Body(ValidationPipe) createUserDto: CreateUserDto,
  // ): CreateUserDto {
  //   const newUser: UserEntity = {
  //     ...createUserDto,
  //     id: uuid(),
  //   };

  //   this.users.push(newUser);

  //   return newUser;
  // }

  @Post()
  // @UsePipes(new ValidationPipe({ groups: ['create'] }))
  @HttpCode(HttpStatus.CREATED)
  createUser(
    @Body()
    createUserDto: CreateUserDto,
  ): CreateUserDto {
    return this.usersService.createUser(createUserDto);
  }

  // Patch for update specific field in object
  // Put for update all object (To update specific field must send full object)
  @Patch(':id')
  // @UsePipes(new ValidationPipe({ groups: ['update'] }))
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body()
    updateUserDto: UpdateUserDto,
  ): UpdateUserDto {
    return this.usersService.updateUser(id, updateUserDto);
  }

  // @Delete(':username')
  // remove(@Param('username') username: string, @Res() res: Response): string {
  //   res.status(204).send();
  // }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: string): { message: string } {
    return this.usersService.deleteUser(id);
  }
}
