import {Model, Column, Table, CreatedAt, UpdatedAt, DataType, ForeignKey, BelongsTo} from "sequelize-typescript";
import Area from "./area.model";
import GaliMohalla from "./gali_mohalla.model";

@Table
export default class LastNames extends Model {

    @Column({ type: DataType.STRING })
    name!: string;

    @ForeignKey(() => GaliMohalla)
    @Column({type: DataType.INTEGER})
    galiMohallaId: number

    @BelongsTo(()=> GaliMohalla)
    galiMohalla!: Area;

    @CreatedAt
    createdAt!: Date;

    @UpdatedAt
    updatedAt!: Date;

}