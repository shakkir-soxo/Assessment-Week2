import { BadRequestException, CanActivate, ExecutionContext } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";


export class AuthGuard implements CanActivate {
    constructor(
       private jwtService:JwtService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean>  {
        const request = context.switchToHttp().getRequest()
        const token = await this.extractTokenFromHeader(request)
        if(!token){
            throw new BadRequestException('Un authorized')
        }
        try {
          const user = this.jwtService.verifyAsync(token,{
             secret:'secret123'
          })

          request.user = user
          
            
        } catch (error) {
            if(error instanceof BadRequestException){
                throw error
            }
        }

        return true
    }
    
    async extractTokenFromHeader(request:Request) {
        const[type,token] = request.headers.authorization?.split(' ') ?? []
        return type === 'Bearer' ? token : undefined
    }

   
}