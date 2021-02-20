import { MigrationInterface, QueryRunner } from 'typeorm';

export default class AddAvatarFieldToUsers1613789718575
  implements MigrationInterface {
  name = 'AddAvatarFieldToUsers1613789718575';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "avatar" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "avatar"`);
  }
}
