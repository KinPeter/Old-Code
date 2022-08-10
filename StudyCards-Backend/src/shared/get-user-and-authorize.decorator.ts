import { createParamDecorator, ForbiddenException, Logger } from '@nestjs/common';
import { UserDocument } from 'src/auth/user.model';

export const GetUserAndAuthorize = createParamDecorator(
  (data, req): UserDocument => {
    const authUser = req.args[0].user._id.toString();
    const targetUser = req.args[0].params.userId;
    console.log();
    if (authUser !== targetUser) {
      Logger.warn(`Request for user with id ${authUser} is forbidden!`, 'GetUserAndAuthorize');
      throw new ForbiddenException();
    }
    return req.args[0].user;
  },
);
