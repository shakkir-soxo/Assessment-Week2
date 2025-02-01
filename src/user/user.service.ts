import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserRegisterDto } from './dto/user.register.dto';
import * as bcrypt from 'bcrypt'
import { User } from './user.model';
import { InjectModel } from '@nestjs/sequelize';
import { UserValidateDto } from './dto/user.validate.dto';


@Injectable()
export class UserService {
   constructor(
    @InjectModel(User)
        private userModel:typeof User
    ){}
    
   async register(registerData:UserRegisterDto){
       try {
        const isUserExist = await this.userModel.findOne({where:{email:registerData.email}})
        if(isUserExist){
            throw new BadRequestException('User already exist')
        }
        const hashedPasword =  bcrypt.hashSync(registerData.password,10)
        const newUser = {...registerData,password:hashedPasword}
         return   await this.userModel.create(newUser)
         
       
        
       } catch (error) {
          if(error instanceof BadRequestException){
            throw error
          }

          throw new InternalServerErrorException('Failed to create user')
       }
    }


    async validateUser(email:string){
        try {
         const user = await this.userModel.findOne({where:{email:email}})
         if(!user){
            throw new BadRequestException('Invalid credentials')
         }

        return user

        } catch (error) {
            if(error instanceof BadRequestException){
                throw error
            }

            throw new InternalServerErrorException('Internal server error')
        }
    }
}




