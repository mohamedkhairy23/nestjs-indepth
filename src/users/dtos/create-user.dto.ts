import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(3, 20)
  // @Length(3, 20, {
  //   message: 'Incorrect Length, username must between 3 and 20 characters',
  //   groups: ['create'],
  // })
  // @Length(6, 30, {
  //   message: 'Incorrect Length, username must between 6 and 30 characters',
  //   groups: ['update'],
  // })
  readonly username: string;

  @IsEmail({}, { message: 'Incorrect email' })
  readonly email: string;

  @IsString()
  readonly country: string;

  // readonly mean no business logic here In CreateUserDto
}
