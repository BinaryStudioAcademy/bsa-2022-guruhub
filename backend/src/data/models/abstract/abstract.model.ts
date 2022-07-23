import { Model } from 'objection';

class Abstract extends Model {
  'id': number;

  'createdAt': string;

  'updatedAt': string;

  override $beforeInsert(): void {
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  override $beforeUpdate(): void {
    this.updatedAt = new Date().toISOString();
  }
}

export { Abstract };
