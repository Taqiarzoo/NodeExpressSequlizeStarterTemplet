import {Model, Column, Table, CreatedAt, UpdatedAt, DataType, ForeignKey, BelongsTo} from "sequelize-typescript";
import Area from "./area.model";

@Table
export default class GaliMohalla extends Model {

    @Column({ type: DataType.STRING })
    name!: string;

    @ForeignKey(() => Area)
    @Column({type: DataType.INTEGER})
    areaId: number

    @BelongsTo(()=> Area)
    area!: Area;

    @CreatedAt
    createdAt!: Date;

    @UpdatedAt
    updatedAt!: Date;

}
