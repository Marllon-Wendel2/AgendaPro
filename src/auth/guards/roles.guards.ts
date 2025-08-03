import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { JwtPayload, UserType } from '../../types/UserType.enum';
import { Request } from 'express';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserType[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user as JwtPayload;

    console.log('🛡️ RolesGuard => user:', user);
    console.log('🛡️ RolesGuard => requiredRoles:', requiredRoles);

    // Se não tiver payload no token, nega.
    if (!user || !user.type) {
      throw new ForbiddenException('Usuário não autenticado.');
    }

    // Se tiver roles exigidos, verifica se o type bate
    if (requiredRoles && !requiredRoles.includes(user.type)) {
      throw new ForbiddenException('Acesso negado ao tipo de usuário.');
    }

    return true;
  }
}
