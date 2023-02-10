import { CreateUserDto } from '../dto/create-user.dto';

export class User {
  private name: string;
  private email: string;
  private password: string;
  private role: string;
  private isActive: boolean;
  private memberSince: string;
  private isValid: boolean;
  private isOpenToWork: boolean;
  private repoUrl: string;
  private portfolioUrl: string;
  private linkedinUrl: string;
  private phone: string;
  private description: string;

  constructor(user: CreateUserDto) {
    this.isValid = !!(user.password === user.passwordRepeat);
    this.password = user.password;
    this.email = user.email;
    this.name = user.name;
    this.role = user.role;
    this.isActive = true;
    this.memberSince = new Date().toLocaleDateString('pt-br');
    this.isOpenToWork = false;
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

  get _isOpenToWork() {
    return this.isOpenToWork;
  }

  get _repoUrl() {
    return this.repoUrl;
  }

  get _portfolioUrl() {
    return this.portfolioUrl;
  }

  get _linkedinUrl() {
    return this.linkedinUrl;
  }

  get _phone() {
    return this.phone;
  }

  get _description() {
    return this.description;
  }

  setPassword(pwd: string) {
    this.password = pwd;
  }

  setOpenToWork(isOpenToWork: boolean) {
    this.isOpenToWork = isOpenToWork;
  }

  setrepoUrl(url: string) {
    this.repoUrl = url;
  }

  setportfolioUrl(url: string) {
    this.portfolioUrl = url;
  }

  setlinkedinUrl(url: string) {
    this.linkedinUrl = url;
  }

  setphone(phone: string) {
    this.phone = phone;
  }

  setdescription(description: string) {
    this.description = description;
  }
}
