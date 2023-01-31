import { CreateUserDto } from '../dto/create-user.dto';

export class User {
  private name: string;
  private email: string;
  private password: string;
  private role: string;
  private isActive: boolean;
  private memberSince: string;
  private isValid: boolean;

  constructor(user: CreateUserDto) {
    this.isValid = user.password === user.passwordRepeat ? true : false;
    this.password = user.password;
    this.email = user.email;
    this.name = user.name;
    this.role = user.role;
    this.isActive = true;
    this.memberSince = new Date().toLocaleDateString('pt-br');
  }

  get _email() {
    return this.email;
  }

  get _name() {
    return this.name;
  }

  get _role() {
    return this.role;
  }

  get _isActive() {
    return this.isActive;
  }

  get _memberSince() {
    return this.memberSince;
  }

  get _isValid() {
    return this.isValid;
  }
}
