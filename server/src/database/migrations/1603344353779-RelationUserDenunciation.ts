import { MigrationInterface, QueryRunner } from 'typeorm';

export default class RelationUserDenunciation1603344353779
  implements MigrationInterface {
  name = 'RelationUserDenunciation1603344353779';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "denunciations" ADD "user_id" uuid`);
    await queryRunner.query(
      `ALTER TABLE "denunciations" ADD CONSTRAINT "FK_14207eb5b7bd41330d66d285f0d" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "denunciations" DROP CONSTRAINT "FK_14207eb5b7bd41330d66d285f0d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "denunciations" DROP COLUMN "user_id"`,
    );
  }
}
