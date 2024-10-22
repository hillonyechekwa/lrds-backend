import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateDurationType1727544942189 implements MigrationInterface {
    name = 'UpdateDurationType1727544942189'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "transactions" ("id" SERIAL NOT NULL, "transaction_reference" character varying, "payment_link" character varying, "transaction_status" character varying, "status" character varying NOT NULL DEFAULT 'not paid', "booking_id" integer NOT NULL, CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "service" DROP COLUMN "duration"`);
        await queryRunner.query(`ALTER TABLE "service" ADD "duration" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "service" DROP COLUMN "duration"`);
        await queryRunner.query(`ALTER TABLE "service" ADD "duration" TIME NOT NULL`);
        await queryRunner.query(`DROP TABLE "transactions"`);
    }

}
