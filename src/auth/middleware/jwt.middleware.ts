import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';
import { JwtPayload } from 'src/types/UserType.enum';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];

    if (!authHeader?.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token não fornecido.');
    }

    const token = authHeader.split(' ')[1];

    try {
      const payload: any = await this.jwtService.verifyAsync<JwtPayload>(token);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      req.user = payload;
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException('Token inválido ou expirado.');
    }

    next();
  }
}
