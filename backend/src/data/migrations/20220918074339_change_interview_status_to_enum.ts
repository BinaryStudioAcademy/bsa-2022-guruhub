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
  await knex.schema.raw(`
    UPDATE interviews SET status = (CASE WHEN status = '${InterviewStatusUppercase.PENDING}' THEN '${InterviewStatus.PENDING}'
      WHEN status = '${InterviewStatusUppercase.IN_PROGRESS}' THEN '${InterviewStatus.IN_PROGRESS}'
      WHEN status = '${InterviewStatusUppercase.COMPLETED}' THEN '${InterviewStatus.COMPLETED}'
      WHEN status = '${InterviewStatusUppercase.REJECTED}' THEN '${InterviewStatus.REJECTED}'
      WHEN status = '${InterviewStatusUppercase.NEW}' THEN '${InterviewStatus.NEW}'
      WHEN status = '${InterviewStatusUppercase.CANCELED}' THEN '${InterviewStatus.CANCELED}'
      ELSE status
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
    UPDATE interviews SET status = (CASE WHEN status = '${InterviewStatus.PENDING}' THEN '${InterviewStatusUppercase.PENDING}'
      WHEN status = '${InterviewStatus.IN_PROGRESS}' THEN '${InterviewStatusUppercase.IN_PROGRESS}'
      WHEN status = '${InterviewStatus.COMPLETED}' THEN '${InterviewStatusUppercase.COMPLETED}'
      WHEN status = '${InterviewStatus.REJECTED}' THEN '${InterviewStatusUppercase.REJECTED}'
      WHEN status = '${InterviewStatus.NEW}' THEN '${InterviewStatusUppercase.NEW}'
      WHEN status = '${InterviewStatus.CANCELED}' THEN '${InterviewStatusUppercase.CANCELED}'
      ELSE status
  END);`);
}

export { down, up };
