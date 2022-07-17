import { User as UserType, CreateUserPayload } from '~/common/types/types';
import { UserModel } from '~/data/models/models';

type Constructor = {
	UserModelInstance: typeof UserModel;
};

class User {
	#UserModel: typeof UserModel;

	constructor({ UserModelInstance }: Constructor) {
		this.#UserModel = UserModelInstance;
	}

	async getAll(): Promise<UserType[]> {
		return this.#UserModel.query();
	}

	async create(payload: CreateUserPayload): Promise<UserType> {
		return this.#UserModel.query().insert(payload);
	}
}

export { User };
