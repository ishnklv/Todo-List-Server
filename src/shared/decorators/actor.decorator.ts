import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserEntity } from '../../modules/database/entities/user.entity';

export const Actor = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): UserEntity => {
    const { user } = ctx.switchToHttp().getRequest();

    return user;
  },
);
