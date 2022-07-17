import { CreateUserPayload, User } from '~/common/types/types';
import { user as userRepository } from '~/data/repositories/repositories';

type Constructor = {
	userRepositoryInstance: typeof userRepository;
};

class Auth {
	#userRepository: typeof userRepository;

	constructor({ userRepositoryInstance }: Constructor) {
		this.#userRepository = userRepositoryInstance;
	}

	signUp(payload: CreateUserPayload): Promise<User> {
		return this.#userRepository.create(payload);
	}
}

export { Auth };
