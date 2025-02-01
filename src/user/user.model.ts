import { Table,Model,DataType,Column } from "sequelize-typescript";


@Table

export class User extends Model {
     @Column({
        type:DataType.STRING,
        allowNull:false
     })

     userName:string

     @Column({
        type:DataType.STRING,
        allowNull:false
     })

     email:string


     @Column({
        type:DataType.STRING,
        allowNull:false
     })

     password:string
}

