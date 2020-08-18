import {MigrationInterface, QueryRunner} from "typeorm";

export class AddedPasswordInEmployee1597502089374 implements MigrationInterface {
    name = 'AddedPasswordInEmployee1597502089374'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "password" character varying(60) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "password"`);
    }

}
