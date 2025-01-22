import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { logInfo } from 'src/common/utils/logger';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configServices: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configServices.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    logInfo('JwtStrategy', payload);
    return {
      email: payload.email,
      id: payload.id,
      role: payload.role,
    };
  }
}
