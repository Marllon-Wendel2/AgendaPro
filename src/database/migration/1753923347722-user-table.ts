import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserTable1753923347722 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

    await queryRunner.query(`
      CREATE TABLE "user" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "nome" varchar NOT NULL,
        "email" varchar NOT NULL UNIQUE,
        "senha" varchar NOT NULL
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
