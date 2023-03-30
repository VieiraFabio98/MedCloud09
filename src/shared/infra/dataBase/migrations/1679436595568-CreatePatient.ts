import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreatePatient1679436595568 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table(
                {
                    name: "patient",
                    columns: [
                        {
                            name: "id",
                            type: "uuid",
                            isPrimary: true
                        },
                        {
                            name: "name",
                            type: "varchar",
                        },
                        {
                            name: "birth_date",
                            type: "varchar"
                        },
                        {
                            name: "email",
                            type: "varchar",
                        },
                        {
                            name: "address",
                            type: "varchar"
                        },
                        {
                            name: "created_at",
                            type: "timestamp",
                            default: "now()"
                        },
                        {
                            name: "updated_at",
                            type: "timestamp",
                            default: "now()"
                        },
                        {
                            name: "password",
                            type: "varchar"
                        },
                        {
                            name: "is_admin",
                            type: "boolean",
                            default: false
                        }

                    ]
                }

            )
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("patient")
    }

}
