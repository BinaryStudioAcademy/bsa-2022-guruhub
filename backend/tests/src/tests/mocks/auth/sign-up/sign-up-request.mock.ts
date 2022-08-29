import { faker } from '@faker-js/faker';
import { UserSignUpRequestDto } from 'guruhub-shared';

const signUpRequestMock = (email?: string): UserSignUpRequestDto => ({
  fullName: `${faker.name.firstName()} ${faker.name.lastName()}`,
  email: email ?? faker.internet.email(),
  password: faker.internet.password(12),
});

export { signUpRequestMock };
