import { BadRequestException, Injectable } from '@nestjs/common';
import { UploadFileDto } from './dto/file.upload.dto';
import { Files } from './file.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()   //marks this class as a provider which  can injected to other classes
export class FileService {
    constructor(
        @InjectModel(Files)  // inject files model for database interaction related to the files table
        private filesModel:typeof Files  //filesmodel for intercating with files table
    ) {}
    async saveFile(file:UploadFileDto){
        try {
          const saveFile = await this.filesModel.create({     //Adding the metadata of file into the table
            fileName:file.fileName,
            size:file.size,
            date:file.date
          })

          if(!saveFile){   //check if the file was saved successfully 
            throw new BadRequestException('failed to save file')//show an error if the file is not saved correctley
          }

           return saveFile   // returning the saved file data

        } catch (error) {
            if(error instanceof BadRequestException){
                throw error                               // showing the error
            }
        }
    }
}
