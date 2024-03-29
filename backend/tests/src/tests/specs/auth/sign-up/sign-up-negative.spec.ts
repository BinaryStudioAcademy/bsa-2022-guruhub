import { HttpCode } from 'guruhub-shared';

import { withTestData } from '~/lib/helpers/helpers';
import { apiSessionStorage, authService } from '~/lib/services/services';
import { errorResponseSchema } from '~/tests/json-schemas/json-schemas';

describe('Sign up negative tests', () => {
  before(() => apiSessionStorage.addAndEnterSession('default'));

  after(() => apiSessionStorage.removeSession('default'));

  withTestData(
    [
      {
        fullName: '',
        email: 'emailIs@correct.com',
        password: 'PasswordIsCorrect',
      },
      {
        fullName: 'on',
        email: 'emailIs@correct.com',
        password: 'PasswordIsCorrect',
      },
      {
        fullName: '123',
        email: 'emailIs@correct.com',
        password: 'PasswordIsCorrect',
      },
      {
        fullName: 'numbers1',
        email: 'emailIs@correct.com',
        password: 'PasswordIsCorrect',
      },
      {
        fullName: 'special$',
        email: 'emailIs@correct.com',
        password: 'PasswordIsCorrect',
      },
      {
        fullName:
          'testingmorethansixtycharacterstestingmorethansixtycharacterss',
        email: 'emailIs@correct.com',
        password: 'PasswordIsCorrect',
      },

      { fullName: 'NameIsCorrect', email: '', password: 'PasswordIsCorrect' },
      {
        fullName: 'NameIsCorrect',
        email: 'e@c.',
        password: 'PasswordIsCorrect',
      },
      {
        fullName: 'NameIsCorrect',
        email: ' @incorrect.com',
        password: 'PasswordIsCorrect',
      },
      {
        fullName: 'NameIsCorrect',
        email: 'emailis@incorrect',
        password: 'PasswordIsCorrect',
      },
      {
        fullName: 'NameIsCorrect',
        email: 'testingmorethansixtycharacterstestingmorethan@sixty.character',
        password: 'PasswordIsCorrect',
      },

      { fullName: 'NameIsCorrect', email: 'emailIs@correct.com', password: '' },
      {
        fullName: 'NameIsCorrect',
        email: 'emailIs@correct.com',
        password: '1234567',
      },
      {
        fullName: 'NameIsCorrect',
        email: 'emailIs@correct.com',
        password: 'testingmorethanthirtytwocharactez',
      },
      {
        fullName: '',
        email: '',
        password: '',
      },
    ],

    ({ fullName, email, password }) => {
      it(`Sign up using invalid credentials:
      1.fullName: ${fullName}
      2.Email: ${email}
      3.Password: ${password}`, async () => {
        const response = await authService.signUp({
          fullName,
          email,
          password,
        });

        response.should.have.status(HttpCode.BAD_REQUEST);
        response.should.have.normalExecutionTime;
        response.body.should.have.jsonSchema(errorResponseSchema);
      });
    },
  );
});
