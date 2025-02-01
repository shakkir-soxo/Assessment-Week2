import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Files } from './file.model';

@Module({
    imports:[
        SequelizeModule.forFeature([Files])     // Register files model for database interactions
    ],
    providers:[FileService],                   // Register fileservice as a provider
    controllers:[FileController]              // Register filecontroll for handleroutes
})
export class FileModule {}
