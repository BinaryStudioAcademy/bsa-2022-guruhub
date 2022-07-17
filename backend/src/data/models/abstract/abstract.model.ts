import { Model } from 'objection';
import { AbstractDbEntityKey } from '~/common/enums/enums';

class Abstract extends Model {
	[AbstractDbEntityKey.ID]!: number;

	[AbstractDbEntityKey.CREATED_AT]!: string;

	[AbstractDbEntityKey.UPDATED_AT]!: string;

	override $beforeInsert(): void {
		this.createdAt = new Date().toISOString();
		this.updatedAt = new Date().toISOString();
	}

	override $beforeUpdate(): void {
		this.updatedAt = new Date().toISOString();
	}
}

export { Abstract };
