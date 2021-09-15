import {Model, Column, Table, CreatedAt, UpdatedAt, DataType, BelongsTo, ForeignKey} from "sequelize-typescript";
import AddressType from "./address_type.model";
import Area from "./area.model";
import City from "./city.model";
import Country from "./country.model";

import Member from "./member.model";
import Relation from "./relation.model";
import State from "./state.model";

@Table
export default class Family extends Model {

    @Column({ type: DataType.STRING })
    family_no!: string;

    @BelongsTo(() => Member,{
        foreignKey:"headId",
        as:"head"
    })
    head?: Member;

    @BelongsTo(() => Member,{
        foreignKey:"memberId",
        as:"member"
    })

    @BelongsTo(() => Member,{
        foreignKey:"tempHeadId",
        as:"tempHead"
    })

    @Column({
        type: DataType.BOOLEAN,
        allowNull:false,
        defaultValue: 0
    })
    is_head_assign:string;

    @Column({
        type: DataType.BOOLEAN,
        allowNull:false,
        defaultValue: 0
    })
    is_relation_define:string;


    @ForeignKey(() => Relation)
    @Column({type: DataType.INTEGER})
    relationId: number

    @BelongsTo(() => Relation)
    relation?: Relation; 

}
