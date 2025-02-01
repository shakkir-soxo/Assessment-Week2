import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import  * as bcrypt from 'bcrypt'
import { UserRegisterDto } from 'src/user/dto/user.register.dto';
import { LoginUserDto } from './login.user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private userService:UserService,
        private jwtService:JwtService
    ) {}
   
   async getAuthenticatedUser(email:string,password:string){
        const user = await this.userService.validateUser(email)
        const verifyUser = await this.verifyPassword(password,user)
        if(verifyUser && user){
           return user
        }


    }

  async verifyPassword(password:string,user:UserRegisterDto){
    const verifyPassword = bcrypt.compareSync(password,user.password)
    if(!verifyPassword){
        throw new UnauthorizedException('Un authorized')
    }
    return true
  }

  async login(userLoginData:LoginUserDto){
     const user = await this.getAuthenticatedUser(
        userLoginData.email,
        userLoginData.password
     )
    
    const payload = {email:user.email,sub:user.id}
    const access_token = this.jwtService.sign(payload)
    return access_token
    
  }
    
}
