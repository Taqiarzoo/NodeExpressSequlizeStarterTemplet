import { Model, Column, Table, CreatedAt, UpdatedAt, DataType, HasOne, Length, HasMany } from "sequelize-typescript";


@Table
export default class Address extends Model {

    @Column({
        allowNull: false,
        comment: 'generated username',
        unique: true,
        type: DataType.STRING
    })
    username!: any;

    @Column({ type: DataType.STRING, unique: true })
    firebaseUID!: string;

    @Length({ min: 13, max: 13, msg: 'Invalid number from sequelize' })
    @Column({
        type: DataType.STRING(13),
        allowNull: true,
        unique: true,
        comment: 'phone number'
    })
    number!: string;

    @Column({
        type: DataType.STRING
    })
    deviceId!: string;

    @Column({
        type: DataType.STRING
    })
    deviceOS!: string;

    @Column({
        type: DataType.TEXT
    })
    authToken?: string;

    @CreatedAt
    createdAt!: Date;

    @UpdatedAt
    updatedAt!: Date;

   

}
