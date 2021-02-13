import { createParamDecorator, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { UserDocument } from 'src/users/users.model';

export const GetUserAndAuthorize = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): UserDocument => {
    const req = ctx.switchToHttp().getRequest();
    if (req.user.id !== req.params.userId) {
      throw new ForbiddenException();
    }
    return req.user;
  },
);
