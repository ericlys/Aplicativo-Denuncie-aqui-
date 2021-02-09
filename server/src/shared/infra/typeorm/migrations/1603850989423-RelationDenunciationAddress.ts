import { MigrationInterface, QueryRunner } from 'typeorm';

export default class RelationDenunciationAddress1603850989423
  implements MigrationInterface {
  name = 'RelationDenunciationAddress1603850989423';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "addresses" ADD "denunciationId" uuid`,
    );
    await queryRunner.query(
      `ALTER TABLE "addresses" ADD CONSTRAINT "UQ_7ebf4b5e4fa34d3658f9d9cbfaa" UNIQUE ("denunciationId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "addresses" ADD CONSTRAINT "FK_7ebf4b5e4fa34d3658f9d9cbfaa" FOREIGN KEY ("denunciationId") REFERENCES "denunciations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "addresses" DROP CONSTRAINT "FK_7ebf4b5e4fa34d3658f9d9cbfaa"`,
    );
    await queryRunner.query(
      `ALTER TABLE "addresses" DROP CONSTRAINT "UQ_7ebf4b5e4fa34d3658f9d9cbfaa"`,
    );
    await queryRunner.query(
      `ALTER TABLE "addresses" DROP COLUMN "denunciationId"`,
    );
  }
}
