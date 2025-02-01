import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FileModule } from './file/file.module';
import { UserModule } from './user/user.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './auth/auth.module';

@Module({
  imports:[
    UserModule,
    SequelizeModule.forRoot({
      dialect:'mssql',
      host:'ec2-15-206-206-108.ap-south-1.compute.amazonaws.com',
      port:1433,
      username:'user_soxo',
      password:'soxo@123',
      database:'soxo',
      autoLoadModels:true
    }),
    FileModule,
    AuthModule,
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
