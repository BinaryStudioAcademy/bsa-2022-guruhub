import { User as TUser } from '~/common/types/types';
import { user as userRepository } from '~/data/repositories/repositories';

type Constructor = {
	userRepositoryInstance: typeof userRepository;
};

class User {
	#userRepository: typeof userRepository;

	constructor({ userRepositoryInstance }: Constructor) {
		this.#userRepository = userRepositoryInstance;
	}

	getAll(): Promise<TUser[]> {
		return this.#userRepository.getAll();
	}
}

export { User };
