import { MigrationInterface, QueryRunner } from 'typeorm';

export default class AddAvatarFieldToUsers1613789718575
  implements MigrationInterface {
  name = 'AddAvatarFieldToUsers1613789718575';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "avatar" character varying`,
    );
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('users')
      .values([
        {
          id: `${process.env.UUID_ANONYMOUS_USER}`,
          name: 'anonymous',
          email: 'anonymous@anonymous',
          cpf: '000.000.000-00',
          password: 'anonymous',
          avatar: null,
        },
      ])
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "avatar"`);
    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('users')
      .where([
        {
          id: `${process.env.UUID_ANONYMOUS_USER}`,
        },
      ])
      .execute();
  }
}
