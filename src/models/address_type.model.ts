import {Model, Column, Table, CreatedAt, UpdatedAt, DataType} from "sequelize-typescript";

@Table
export default class AddressType extends Model {

    @Column({ type: DataType.STRING })
    type!: string;

    @CreatedAt
    createdAt!: Date;

    @UpdatedAt
    updatedAt!: Date;

}
