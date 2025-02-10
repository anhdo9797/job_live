import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { I18nService } from 'nestjs-i18n';
import { ROLES_KEY } from 'src/common/config/roles.decorator';
import { Role } from 'src/common/constants/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private i18nService: I18nService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    if (!user) {
      console.log('User not found');
      return false;
    }
    return requiredRoles.some((role) => user.role?.includes(role));
  }

  handleRequest(err, user) {
    if (err || !user) {
      throw (
        err || new ForbiddenException(this.i18nService.t('exception.FORBIDDEN'))
      );
    }
    return user;
  }
}
