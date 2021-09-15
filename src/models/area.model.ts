import {Model, Column, Table, CreatedAt, UpdatedAt, DataType, BelongsTo, ForeignKey, HasMany} from "sequelize-typescript";
import City from "./city.model";
import Country from "./country.model";
import GaliMohalla from "./gali_mohalla.model";
import State from "./state.model";

@Table
export default class Area extends Model {

    @Column({ type: DataType.STRING })
    name!: string;


    @ForeignKey(() => Country)
    @Column({type: DataType.INTEGER})
    countryId: number
    
    @BelongsTo(() => Country)
    country?: Country;

    @ForeignKey(() => State)
    @Column({type: DataType.INTEGER})
    stateId: number

    
    @BelongsTo(() => State)
    state?: State;

    @HasMany(() => GaliMohalla)
    galiMohalla?: GaliMohalla;

    @ForeignKey(() => City)
    @Column({type: DataType.INTEGER})
    cityId: number

    @BelongsTo(() => City)
    city?: City;

    @CreatedAt
    createdAt!: Date;

    @UpdatedAt
    updatedAt!: Date;

}
