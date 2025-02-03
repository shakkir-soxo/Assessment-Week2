import { Injectable, UnauthorizedException } from '@nestjs/common';
import  * as bcrypt from 'bcrypt'
import { UserRegisterDto } from 'src/user/dto/user.register.dto';
import { LoginUserDto } from './login.user.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private userService:UserService,    // Injecting user service to validate user
        private jwtService:JwtService       // Injecting jwt service for generating jwt token
    ) {}
   
   async getAuthenticatedUser(email:string,password:string){  // Method to authenticate user by vaidating email and password
        const user = await this.userService.validateUser(email) // fetch user by email
        const verifyUser = await this.verifyPassword(password,user) // Verify the password 
        if(verifyUser && user){
           return user                         // Return user if authentication is successfull
        }


    }

  async verifyPassword(password:string,user:UserRegisterDto){  
    const verifyPassword = bcrypt.compareSync(password,user.password)  // compare the provided password with the  hashed password
    if(!verifyPassword){
        throw new UnauthorizedException('Un authorized') // throw error if password dont match
    }
    return true   // return true if password is correct 
  }

  async login(userLoginData:LoginUserDto){              // Meithod for login user and generating jwt token
     const user = await this.getAuthenticatedUser(
        userLoginData.email,
        userLoginData.password
     )
    
    const payload = {email:user.email,sub:user.id}  // Payload for jwt token
    const access_token = this.jwtService.sign(payload)  // Generating jwt  token
    return access_token   // Return the generated token
    
  }
    
}
