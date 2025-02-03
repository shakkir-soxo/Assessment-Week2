import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';

@Module({
    imports:[
        SequelizeModule.forFeature([User])     // register the user module to be used with sequelize for database intercations
    ],
    providers:[UserService],        
    controllers:[UserController],
    exports:[UserService]
   
   
})

export class UserModule {}
