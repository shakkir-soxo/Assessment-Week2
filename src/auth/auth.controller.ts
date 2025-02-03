import { Controller,Post,Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './login.user.dto';

@Controller('auth')
export class AuthController {
   constructor(
      private authService:AuthService    // Injecting auth service 
   ) {}

   @Post('login')                       // login route /auth/login
   async login(@Body() login:LoginUserDto){         // Accessing Login data from the request body
      const token = await this.authService.login(login)   // Passing login data to service for handle login and genrate token
      return {
        message:'Login sucessfull',             // Success message
        token                                  // Returning token
      }
   }
}
