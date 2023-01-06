import { HttpException, HttpStatus } from '@nestjs/common';
import { Prisma } from '@prisma/client';

export const isUniqueError = (e: Error): HttpException | boolean => {
  if (e instanceof Prisma.PrismaClientKnownRequestError) {
    if (e.code === 'P2002') {
      const uniqueProp: string = e.message
        .match(/\(`(.+)`\)/g)!
        .at(0)!
        .replace(/[()`]/g, '');

      // if username & email already registered
      return new HttpException(
        `${uniqueProp} already registered`,
        HttpStatus.BAD_REQUEST
      );
    }
  }

  return false;
};
