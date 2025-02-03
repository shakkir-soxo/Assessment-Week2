import { InjectModel } from "@nestjs/sequelize";
import { UserRegisterDto } from "./dto/user.register.dto";
import { User } from "./user.model";
import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt'


@Injectable()
export class UserService {
    constructor(
        @InjectModel(User)
        private userModel:typeof User
    ){}
    
    async register(registerData:UserRegisterDto){    // method  to register a new user  
        try {
         const isUserExist = await this.userModel.findOne({where:{email:registerData.email}}) //checking if the user is already existed by email
         if(isUserExist){
             throw new BadRequestException('User already exist') // throw an error if user is already registerd
         }
         const hashedPasword =  bcrypt.hashSync(registerData.password,10) // hashing the password for security
         const newUser = {...registerData,password:hashedPasword}  // creating a new object with  the hashed password
          return   await this.userModel.create(newUser)  // saving the new user to the database
          
        
         
        } catch (error) {
           if(error instanceof BadRequestException){    // rethrow the badrequest error if user is already exist
             throw error   
           }
 
           throw new InternalServerErrorException('Failed to create user')   // throw generic error if user creation is failed
        }       

          }


    async validateUser(email:string){     // creating vlidate user method for  taking user by email
            try {
             const user = await this.userModel.findOne({where:{email:email}})  // finding the user with given email
             if(!user){
                throw new BadRequestException('Invalid credentials')  // throws an error if the user does not  exist
             }
    
            return user // returnng the user data
    
            } catch (error) {
                if(error instanceof BadRequestException){      // handle the bad request for invalid user 
                    throw error
                }
    
                throw new InternalServerErrorException('Internal server error')  // throws genric error reated to the server
            }
        }
}
