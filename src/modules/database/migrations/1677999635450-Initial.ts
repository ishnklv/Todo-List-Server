import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initial1677999635450 implements MigrationInterface {
  name = 'Initial1677999635450';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "is_deleted" boolean NOT NULL DEFAULT false, "create_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT '"2023-03-05T07:00:36.698Z"', "update_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT '"2023-03-05T07:00:36.698Z"', "login" character varying NOT NULL, "password" character varying NOT NULL, "status" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "tasks" ("id" SERIAL NOT NULL, "is_deleted" boolean NOT NULL DEFAULT false, "create_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT '"2023-03-05T07:00:36.698Z"', "update_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT '"2023-03-05T07:00:36.698Z"', "title" character varying NOT NULL, "description" text NOT NULL, "is_completed" boolean NOT NULL DEFAULT false, "user_id" integer, CONSTRAINT "PK_8d12ff38fcc62aaba2cab748772" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "tasks" ADD CONSTRAINT "FK_db55af84c226af9dce09487b61b" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tasks" DROP CONSTRAINT "FK_db55af84c226af9dce09487b61b"`,
    );
    await queryRunner.query(`DROP TABLE "tasks"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
