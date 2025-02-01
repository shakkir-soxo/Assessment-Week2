import { BadRequestException, Injectable } from '@nestjs/common';
import { UploadFileDto } from './dto/file.upload.dto';
import { Files } from './file.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()   //marks this class as a provider which  can injected to other classes
export class FileService {
    constructor(
        @InjectModel(Files)
        private filesModel:typeof Files
    ) {}
    async saveFile(file:UploadFileDto){
        try {
          const saveFile = await this.filesModel.create({
            fileName:file.fileName,
            size:file.size,
            date:file.date
          })

          if(!saveFile){
            throw new BadRequestException('failed to save file')
          }

           return saveFile

        } catch (error) {
            if(error instanceof BadRequestException){
                throw error
            }
        }
    }
}
