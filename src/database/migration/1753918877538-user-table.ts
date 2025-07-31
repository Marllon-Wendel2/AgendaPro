import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserTableUuidMigration1753918877538 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

    await queryRunner.query(`
      ALTER TABLE "user" 
      ALTER COLUMN "id" DROP DEFAULT,
      ALTER COLUMN "id" TYPE UUID USING uuid_generate_v4(),
      ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "user"
      ALTER COLUMN "id" DROP DEFAULT,
      ALTER COLUMN "id" TYPE INTEGER USING (id::integer),
      ALTER COLUMN "id" SET DEFAULT nextval('user_id_seq'::regclass)
    `);
  }
}
