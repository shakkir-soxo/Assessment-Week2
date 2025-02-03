import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';


@Module({
    imports:[JwtModule.register({     // Configuring jwt authentication by setting a secret key with expiration time
        secret:"secret123",          // jwt secret
        signOptions:{
            expiresIn:'3h'          // expiration time
        }
    }),UserModule],          // importing the usermodule so the authservice can access the user related functionality
    providers:[AuthService],
    controllers:[AuthController],
    
})
export class AuthModule {}
