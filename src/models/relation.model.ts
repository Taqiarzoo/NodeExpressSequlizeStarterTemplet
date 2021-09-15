import {Model, Column, Table, CreatedAt, UpdatedAt, DataType, BelongsTo} from "sequelize-typescript";


@Table
export default class Relation extends Model {

    @Column({ type: DataType.STRING })
    name!: string;

    @CreatedAt
    createdAt!: Date;

    @UpdatedAt
    updatedAt!: Date;

}
