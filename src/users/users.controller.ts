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
  Req,
  SetMetadata,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { CustomValidationPipe } from './pipes/validation.pipe';
import { UsersService } from './users.service';
import { UserResponseDto } from './dtos/user-response.dto';
import { Request } from 'express';
import { AuthGuard } from 'src/common/guards/auth/auth.guard';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('users')
// @UsePipes(ValidationPipe)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @SetMetadata('IS_Public', true)
  @Public()
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAllUsers(
    @Req() req: Request,
    @Query('username', CustomValidationPipe) username: string,
  ): Promise<UserResponseDto[]> {
    // delay 5 seconds
    // console.log(req.body);
    // await new Promise((resolve) => setTimeout(resolve, 5000));

    console.log(process.env.DATABASE_URI);

    return this.usersService.findUsers();
  }

  @Public()
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(
    @Param('id', ParseUUIDPipe)
    id: string,
  ): UserResponseDto {
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

  // @UseGuards(AuthGuard)
  @Post()
  // @UsePipes(new ValidationPipe({ groups: ['create'] }))
  @HttpCode(HttpStatus.CREATED)
  createUser(
    @Body()
    createUserDto: CreateUserDto,
  ): UserResponseDto {
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
  ): UserResponseDto {
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
