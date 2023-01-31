import { CreateUserDto } from '../dto/create-user.dto';
import { User } from './user.entity';
import { faker } from '@faker-js/faker';

describe('User', () => {
  const password = faker.internet.password();
  const fakeUser: CreateUserDto = {
    email: faker.internet.email(),
    name: faker.name.fullName(),
    password: password,
    passwordRepeat: password,
    role: faker.name.jobTitle(),
  };

  it("Should be invalid if passwords don't match", () => {
    const user = new User({ ...fakeUser, passwordRepeat: '32a1sd654' });
    expect(user._isValid).toBe(false);
  });

  it('Should create new user successfully', () => {
    const user = new User(fakeUser);
    expect(user._isValid).toBe(true);
  });
});
