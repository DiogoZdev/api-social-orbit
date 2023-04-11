export class CreateUserDto {
  name: string;
  email: string;
  password: string;
  passwordRepeat: string;
  role: string;
  isActive: boolean;
  memberSince: string;
}
