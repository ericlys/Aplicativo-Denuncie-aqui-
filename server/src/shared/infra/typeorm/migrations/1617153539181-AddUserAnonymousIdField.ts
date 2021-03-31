import { MigrationInterface, QueryRunner } from 'typeorm';

export default class AddUserAnonymousIdField1617153539181
  implements MigrationInterface {
  name = 'AddUserAnonymousIdField1617153539181';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "denunciations" ADD "userAnonymousId" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "denunciations" DROP COLUMN "userAnonymousId"`,
    );
  }
}
