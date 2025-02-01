import { BadRequestException, Body, Controller,Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRegisterDto } from './dto/user.register.dto';

@Controller('user')
export class UserController {
   constructor(
    private userService:UserService 
   ){}

    @Post('register')
     async register(@Body() registerData:UserRegisterDto){
        const user = await this.userService.register(registerData)
        return  {
            message:'User created successfully',
            user
        }
    }
}
