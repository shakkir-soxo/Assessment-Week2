import {  Body, Controller,Post } from '@nestjs/common';
import { UserRegisterDto } from './dto/user.register.dto';
import { UserService } from './user.service';
import { UserControllerDto } from './dto/user.controller.dto';


@Controller('user')                
export class UserController {
   constructor(
    private userService:UserService
   ){}

    @Post('register')               //post request registering the user at user/register
     async register(@Body() registerData:UserRegisterDto):Promise<UserControllerDto>{   //recievig user register data from the request body
        const user = await this.userService.register(registerData)  //passing registration data to the service
        return  { 
            message:'User created successfully',           //success message indicating user was created
            user:{
                id:user.id,
                userName:user.userName,
                email:user.email,  
            }                                    // returning user data
        }  
    }
}
