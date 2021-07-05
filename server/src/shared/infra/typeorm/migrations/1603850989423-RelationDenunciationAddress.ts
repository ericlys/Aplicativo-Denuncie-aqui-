import { MigrationInterface, QueryRunner } from 'typeorm';

export default class RelationDenunciationAddress1603850989423
  implements MigrationInterface {
  name = 'RelationDenunciationAddress1603850989423';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "denunciations" ADD "addressId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "denunciations" ADD CONSTRAINT "UQ_7ebf4b5e4fa34d3658f9d9cbfaa"  UNIQUE ("addressId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "denunciations" ADD CONSTRAINT "FK_ecc275fd65478d00d56ade92e5d" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "denunciations" DROP CONSTRAINT "FK_ecc275fd65478d00d56ade92e5d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "denunciations" DROP CONSTRAINT "UQ_7ebf4b5e4fa34d3658f9d9cbfaa"`,
    );
    await queryRunner.query(
      `ALTER TABLE "denunciations" DROP COLUMN "addressId"`,
    );
  }
}
