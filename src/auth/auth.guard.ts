import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 💡 A guard is a class annotated with the @Injectable() decorator, which implements the CanActivate interface.
    const request = context.switchToHttp().getRequest(); // 💡 canActivate function always return boolean value and  indicating whether the current request is allowed or not.
    const token = this.extractTokenFromHeader(request);

    const roles = this.reflector.get<string>('roles', context.getHandler());
    console.log(roles, 'roles');

    //   console.log(token, 'token');
    if (roles === 'admin') {
      if (!token) {
        throw new UnauthorizedException();
      }
      try {
        const payload = await this.jwtService.verifyAsync(token, {
          // secret: 'MY-TOKEN',
          secret: process.env.MYTOKEN,
        });
        // 💡 We're assigning the payload to the request object here
        // so that we can access it in our route handlers
        request['user'] = payload;
      } catch {
        throw new UnauthorizedException();
      }
      return true;
    }
    if (roles === 'user') {
      if (!token) {
        throw new UnauthorizedException();
      }
      try {
        const payload = await this.jwtService.verifyAsync(token, {
          // secret: 'MY-TOKEN',
          secret: process.env.MYTOKEN,
        });
        // 💡 We're assigning the payload to the request object here
        // so that we can access it in our route handlers
        request['user'] = payload;
      } catch {
        throw new UnauthorizedException();
      }
      return true;
    } else {
      {
        throw new UnauthorizedException();
      }
    }
  }
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
