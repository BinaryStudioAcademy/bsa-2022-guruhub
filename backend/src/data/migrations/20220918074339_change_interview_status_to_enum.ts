import { Knex } from 'knex';

enum InterviewStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in-progress',
  COMPLETED = 'completed',
  REJECTED = 'rejected',
  NEW = 'new',
  CANCELED = 'canceled',
}

enum InterviewStatusUppercase {
  IN_PROGRESS = 'In Progress',
}

const TABLE_NAME = 'interviews';

enum ColumnName {
  STATUS = 'status',
  STATUS_CHECK_CONSTRAINT = 'interviews_status_check',
}

async function up(knex: Knex): Promise<void> {
  await knex.schema.raw(`
    UPDATE interviews SET status = (CASE WHEN status = '${InterviewStatusUppercase.IN_PROGRESS}' THEN '${InterviewStatus.IN_PROGRESS}'
      ELSE LOWER(status)
  END);`);

  await knex.schema.raw(`
    ALTER TABLE "${TABLE_NAME}"
    ADD CONSTRAINT "${ColumnName.STATUS_CHECK_CONSTRAINT}"
    CHECK (${ColumnName.STATUS} IN ('${InterviewStatus.PENDING}', '${InterviewStatus.IN_PROGRESS}', '${InterviewStatus.COMPLETED}', '${InterviewStatus.REJECTED}', '${InterviewStatus.NEW}', '${InterviewStatus.CANCELED}'))
  `);
}

async function down(knex: Knex): Promise<void> {
  await knex.schema.raw(`
    ALTER TABLE "${TABLE_NAME}"
    DROP CONSTRAINT "${ColumnName.STATUS_CHECK_CONSTRAINT}"
  `);

  await knex.schema.raw(`
    UPDATE interviews SET status = (CASE WHEN status = '${InterviewStatus.IN_PROGRESS}' THEN '${InterviewStatusUppercase.IN_PROGRESS}'
      ELSE INITCAP(status)
  END);`);
}

export { down, up };
