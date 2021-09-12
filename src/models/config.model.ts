import {Model, Column, Table, CreatedAt, UpdatedAt, DataType} from "sequelize-typescript";

@Table
export default class Config extends Model {

    @Column({ type: DataType.STRING })
    supportEmail!: string;

    @Column({ type: DataType.STRING })
    supportNumber!: string;

    @Column({ type: DataType.STRING })
    walletNumber!: string;

    @Column({ type: DataType.STRING })
    gameVersion!: string;

    @Column({ type: DataType.STRING })
    updateURL!: string;

    @Column({ type: DataType.DECIMAL(10, 2) })
    percentage!: number;

    @CreatedAt
    createdAt!: Date;

    @UpdatedAt
    updatedAt!: Date;

}
