import { AbstractDbEntityKey } from '~/common/enums/enums';

type AbstractDbEntity = {
	[AbstractDbEntityKey.ID]: number;
	[AbstractDbEntityKey.CREATED_AT]: string;
	[AbstractDbEntityKey.UPDATED_AT]: string;
};

export { AbstractDbEntity };
