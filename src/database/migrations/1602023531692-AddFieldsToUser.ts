import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddFieldsToUser1602023531692
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'cpf',
        type: 'varchar',
      }),
    );

    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'cellphone',
        type: 'varchar',
      }),
    );

    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'cnh',
        type: 'varchar',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'cnh');
    await queryRunner.dropColumn('users', 'cellphone');
    await queryRunner.dropColumn('users', 'cpf');
  }
}
