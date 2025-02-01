import { Controller,Post,Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './login.user.dto';

@Controller('auth')
export class AuthController {
   constructor(
      private authService:AuthService
   ) {}

   @Post('login')
   async login(@Body() login:LoginUserDto){
      const token = await this.authService.login(login)
      return {
        message:'Login sucessfull',
        token
      }
   }
}
