import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class clients1662485060219 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'clients',
                columns: [
                    {
                        name: 'id',
                        type: 'integer',
                        unsigned: true,
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment'
                    },
                    {
                        name: 'full_name',
                        type: 'varchar',
                        isUnique: true,
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        isUnique: true,
                    },
                    {
                        name: 'phone',
                        type: 'varchar',
                        isUnique: false,
                    },
                    {
                        name: 'cpf',
                        type: 'varchar',
                        isUnique: true,
                    },
                    {
                        name: 'current_balance',
                        type: 'float',
                        unsigned: true,
                        isNullable: true
                    },
                    {
                        name: 'average_salary',
                        type: 'float',
                        unsigned: true,
                    },
                    {
                        name: 'status',
                        type: 'varchar',
                    },
                    {
                        name: 'addressId',
                        type: 'integer',
                        unsigned: true,
                        isNullable: true
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()'
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()'
                    }
                ],
                foreignKeys: [
                    {
                        name: 'address_client_foreign',
                        columnNames: ['addressId'],
                        referencedTableName: 'addresses',
                        referencedColumnNames: ['id']
                    }
                ]
            })
        )

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('clients')
    }

}
