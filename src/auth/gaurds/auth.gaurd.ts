import { JwtService } from '@nestjs/jwt';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class AuthGaurd implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1]; // Bearer <token>

    if (!token) {
      throw new ForbiddenException('Token not provided');
    }

    try {
      const tokenPayload = await this.jwtService.verifyAsync(token);

      request.user = {
        _id: tokenPayload.userId,
        email: tokenPayload.email,
      };

      return true;
    } catch (error) {
      throw new ForbiddenException('Invalid token');
    }
  }
}
