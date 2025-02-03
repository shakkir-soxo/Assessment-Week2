import { BadRequestException, CanActivate, ExecutionContext } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";


export class AuthGuard implements CanActivate {    // implementing the CanActivate interface
    constructor(
       private jwtService:JwtService    // Injecting jwtService for verify jwt token
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean>  { 
        const request = context.switchToHttp().getRequest()   // Accessing request that coming to the end point 
        const token = await this.extractTokenFromHeader(request)  // Extracting token from the request header
        if(!token){
            throw new BadRequestException('Un authorized')    // Throw  an error if there is no token
        }
        try {
          const user = this.jwtService.verifyAsync(token,{      // Verifying the token
             secret:'secret123'         
          })

          request.user = user          // Assigning the payoad details extract from token to request
          
            
        } catch (error) {
            if(error instanceof BadRequestException){  // Throw bad requets error 
                throw error
            }
        }

        return true      // returning boolean value for the canActivate
    }
    
    async extractTokenFromHeader(request:Request) {         // method for extracting token from header 
        const[type,token] = request.headers.authorization?.split(' ') ?? []  // splitting token into bearer and token
        return type === 'Bearer' ? token : undefined       // returning token only if type is equal to the string 'Bearer' otherwise return undefined 
    } 

   
}