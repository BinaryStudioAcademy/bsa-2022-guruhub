import { Model } from 'objection';

class Abstract extends Model {
  public 'id': number;

  public 'createdAt': string;

  public 'updatedAt': string;

  public override $beforeInsert(): void {
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  public override $beforeUpdate(): void {
    this.updatedAt = new Date().toISOString();
  }
}

export { Abstract };
