import {MigrationInterface, QueryRunner} from "typeorm";

export class CreatedAddressOfEmployee1598388453788 implements MigrationInterface {
    name = 'CreatedAddressOfEmployee1598388453788'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "address_of_employee" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "zipCode" character varying(9) NOT NULL, "country" character varying(30) NOT NULL, "stateOrProvince" character varying(30) NOT NULL, "city" character varying(30) NOT NULL, "neighborhood" character varying(30) NOT NULL, "publicPlace" character varying(70) NOT NULL, "numberOfThePublicPlace" character varying(5) NOT NULL, "complement" character varying(20), CONSTRAINT "PK_f415f4e930ae27343c5edaa958e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "addressOfEmployeeId" uuid`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_88cb4dff39b5530bcef91f8922a" FOREIGN KEY ("addressOfEmployeeId") REFERENCES "address_of_employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_88cb4dff39b5530bcef91f8922a"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "addressOfEmployeeId"`);
        await queryRunner.query(`DROP TABLE "address_of_employee"`);
    }

}
