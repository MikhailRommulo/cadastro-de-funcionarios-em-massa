import {MigrationInterface, QueryRunner} from "typeorm";

export class AddedIsCustomPasswordInEmployee1597934132358 implements MigrationInterface {
    name = 'AddedIsCustomPasswordInEmployee1597934132358'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "isCustomPassword" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "isCustomPassword"`);
    }

}
