import { MigrationInterface, QueryRunner } from 'typeorm';

export default class RelationCategoryDenunciation1613781159555
  implements MigrationInterface {
  name = 'RelationCategoryDenunciation1613781159555';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "denunciations" ADD "category_id" uuid`,
    );
    await queryRunner.query(
      `ALTER TABLE "denunciations" ADD CONSTRAINT "FK_d85a1a3596a6b1cb03a3f0c0586" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "denunciations" DROP CONSTRAINT "FK_d85a1a3596a6b1cb03a3f0c0586"`,
    );
    await queryRunner.query(
      `ALTER TABLE "denunciations" DROP COLUMN "category_id"`,
    );
  }
}
