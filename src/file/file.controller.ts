import { BadRequestException, Controller,Post, UploadedFile, UseInterceptors,UseGuards } from '@nestjs/common';
import { FileService } from './file.service';
import { UploadFileDto } from './dto/file.upload.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';


@Controller('file')
@UseGuards(AuthGuard)                 //Protect router with authguard to ensure user is authenticated
export class FileController {
   constructor(
    private fileService:FileService
   ) {}
   
  @Post('upload')  //route for uploading the file
  @UseInterceptors(FileInterceptor('file'))   //Intercept the file from request and handle file
   async uploadFile(@UploadedFile() file:Express.Multer.File){
          if(!file){
            throw new BadRequestException('No file found !')  //If the file is not uploaded throw an error
        }
      console.log(file)
      const newFile:UploadFileDto = {
        fileName:file.originalname,                     //create a object using file details
        size:file.size,
        date:new Date
      }
 
      const isUploaded = await this.fileService.saveFile(newFile)  //calling file service to save file
      if(isUploaded) {
        return {
            message:`${isUploaded.fileName}uploaded Successfully`,    //if file sucessfully  saved return sucessmessage
            isUploaded          //returning file object
        }
      }
  }

}
