import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTokens1680011103222 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "tokens",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "refresh_token",
                        type: "varchar"
                    },
                    {
                        name: "patient_id",
                        type: "uuid"
                    },
                    {
                        name: "expires_date",
                        type: "timestamp",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    },
                ],foreignKeys: [
                    {
                        name: "FKPatientToken",
                        referencedTableName: "patient",
                        referencedColumnNames: ["id"],
                        columnNames: ["patient_id"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE",

                    }
                ]

            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("tokens")
    }

}
