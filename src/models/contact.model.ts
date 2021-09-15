import {Model, Column, Table, CreatedAt, UpdatedAt, DataType, BelongsTo, ForeignKey} from "sequelize-typescript";
import Country from "./country.model";
import Member from "./member.model";
import State from "./state.model";

@Table
export default class Contact extends Model {

    @Column({ type: DataType.STRING })
    number!: number;

    @ForeignKey(() => Member)
    @Column({type: DataType.INTEGER})
    memberId: number

    @BelongsTo(()=> Member)
    member!: Member;

    @CreatedAt
    createdAt!: Date;

    @UpdatedAt
    updatedAt!: Date;

}
