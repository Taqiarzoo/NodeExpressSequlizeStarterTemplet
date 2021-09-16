import {Model, Column, Table, CreatedAt, UpdatedAt, DataType, BelongsTo, HasMany, ForeignKey} from "sequelize-typescript";
import Address from "./address.model";
import Contact from "./contact.model";
import MemberType from "./member_type.model";


@Table
export default class Member extends Model {

    @Column({ type: DataType.STRING })
    member!: string;

    @Column({ type: DataType.STRING })
    member_no!: string;

    @Column({ type: DataType.STRING })
    first_name!: string;

    @Column({ type: DataType.STRING })
    middle_name: string;

    @Column({ type: DataType.STRING })
    last_name: string;

    @Column({ type: DataType.DATE })
    dob!: Date;

    @Column({ type: DataType.STRING })
    age!: number;

    @Column({ type: DataType.STRING })
    relative!: string;

    @Column({ type: DataType.STRING })
    email!: string;

    @Column({ type: DataType.STRING })
    website: string;

    @Column({ type: DataType.STRING })
    gender!: string;

    @Column({ type: DataType.STRING })
    category!: string;

    @Column({ type: DataType.STRING })
    details!: string;

    @Column({ type: DataType.DATE })
    date_of_joining!: Date;

    @Column({ type: DataType.STRING })
    married_status!: string;

    @Column({ type: DataType.DATE })
    date_of_married!: Date;

    @Column({
        type: DataType.BOOLEAN,
        allowNull:false,
        defaultValue: 0
    })
    is_assign_family:string;

    @Column({
        type: DataType.BOOLEAN,
        allowNull:false,
        defaultValue: 0
    })
    is_head:string;
    
    @Column({ type: DataType.STRING })
    fee_paid_upto!: string;

    @ForeignKey(() => MemberType)
    @Column({type: DataType.INTEGER})
    memberTypeId: number

    @BelongsTo(() => MemberType)
    memberType?: MemberType;

    @HasMany(() => Contact)
    contact?: Contact;

    @HasMany(() => Address)
    address?: Address;
    
    @CreatedAt
    createdAt!: Date;


    @UpdatedAt
    updatedAt!: Date;

}
