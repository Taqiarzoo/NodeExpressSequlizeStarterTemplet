import {Model, Column, Table, CreatedAt, UpdatedAt, DataType, BelongsTo} from "sequelize-typescript";
import Country from "./country.model";
import State from "./state.model";

@Table
export default class MemberType extends Model {

    @Column({ type: DataType.STRING })
    name!: string;

    @CreatedAt
    createdAt!: Date;

    @UpdatedAt
    updatedAt!: Date;

}
