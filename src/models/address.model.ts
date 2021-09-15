import {Model, Column, Table, CreatedAt, UpdatedAt, DataType, BelongsTo, ForeignKey} from "sequelize-typescript";
import AddressType from "./address_type.model";
import Area from "./area.model";
import City from "./city.model";
import Country from "./country.model";
import GaliMohalla from "./gali_mohalla.model";
import Member from "./member.model";
import State from "./state.model";

@Table
export default class Address extends Model {

    @Column({ type: DataType.STRING })
    house_no!: string;

   

    @ForeignKey(() => Area)
    @Column({type: DataType.INTEGER})
    areaId: number

    @BelongsTo(() => Area)
    area?: Area;

    @Column({ type: DataType.STRING })
    landmark: string;

    @Column({ type: DataType.STRING })
    result: string;

    @Column({ type: DataType.STRING })
    pincode!: string;

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

    @ForeignKey(() => City)
    @Column({type: DataType.INTEGER})
    cityId: number

    @BelongsTo(() => City)
    city?: City;

    @ForeignKey(() => Member)
    @Column({type: DataType.INTEGER})
    memberId: number

    @BelongsTo(()=> Member)
    member!: Member;

   

    @ForeignKey(() => AddressType)
    @Column({type: DataType.INTEGER})
    addressTypeId: number
    
    @BelongsTo(() => AddressType)
    addressType?: AddressType;



    @CreatedAt
    createdAt!: Date;

    @UpdatedAt
    updatedAt!: Date;

}
