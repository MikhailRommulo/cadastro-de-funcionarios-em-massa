import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatedEmployee1597445860066 implements MigrationInterface {
  name = 'CreatedEmployee1597445860066'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "employee" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "name" character varying(65) NOT NULL,
        "document" character varying(14) NOT NULL,
        CONSTRAINT "PK_3c2bc72f03fd5abbbc5ac169498" PRIMARY KEY ("id")
      )`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "employee"`);
  }

}
