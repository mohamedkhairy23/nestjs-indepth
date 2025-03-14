import { Exclude, Expose } from 'class-transformer';

export class UserResponseDto {
  id: string;
  username: string;
  email: string;

  @Expose({ name: 'Country' })
  country: string;

  @Expose({ name: 'City' })
  city: string;

  @Expose({ name: 'Area' })
  street: string;

  @Expose({ name: 'Address' })
  getAddress(): string {
    return this.country + ', ' + this.city + ', ' + this.street;
  }

  @Exclude()
  password: string;

  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }
}
