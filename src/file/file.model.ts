import { DataType, Model,Table,Column } from "sequelize-typescript";

@Table  //Define the sequelize model for the file table
export class Files extends Model {
    @Column({
        type:DataType.STRING,
        allowNull:false
    })

   fileName:string                 // fileName column

   @Column({
    type:DataType.INTEGER,
    allowNull:false
   })
    size:Number                  //file size column


    @Column({
        type:DataType.DATE,
        allowNull:false          //file uploaded date column
    })
     
    date:Date


}