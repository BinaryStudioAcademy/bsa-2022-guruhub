import { AbstractDbEntity } from '../common/abstract-db-entity.type';

type User = AbstractDbEntity & {
	email: string;
};

export { User };
