import { Knex } from 'knex';

enum InterviewStatus {
  PENDING = 'Pending',
  IN_PROGRESS = 'In Progress',
  COMPLETED = 'Completed',
  REJECTED = 'Rejected',
  NEW = 'New',
  CANCELED = 'Canceled',
}

const TABLE_NAME = 'interviews';

enum ColumnName {
  STATUS = 'status',
  STATUS_CHECK_CONSTRAINT = 'interviews_status_check',
}

async function up(knex: Knex): Promise<void> {
  return knex.schema.raw(`
    ALTER TABLE "${TABLE_NAME}"
    ADD CONSTRAINT "${ColumnName.STATUS_CHECK_CONSTRAINT}"
    CHECK (${ColumnName.STATUS} IN ('${InterviewStatus.PENDING}', '${InterviewStatus.IN_PROGRESS}', '${InterviewStatus.COMPLETED}', '${InterviewStatus.REJECTED}', '${InterviewStatus.NEW}', '${InterviewStatus.CANCELED}'))
  `);
}

async function down(knex: Knex): Promise<void> {
  return knex.schema.raw(`
    ALTER TABLE "${TABLE_NAME}"
    DROP CONSTRAINT "${ColumnName.STATUS_CHECK_CONSTRAINT}"
  `);
}

export { down, up };
