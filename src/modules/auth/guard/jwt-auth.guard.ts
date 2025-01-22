import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { logWarning } from 'src/common/utils/logger';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    logWarning('JwtAuthGuard', 'canActivate', 'This is a custom message');
    return super.canActivate(context);
  }
}
