import {
  HttpException,
  HttpStatus
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

export const isUniqueError = (
  e: Error
): HttpException | boolean => {
  if (
    e instanceof
    Prisma.PrismaClientKnownRequestError
  ) {
    if (e.code === 'P2002') {
      const uniqueProp: string =
        e.message
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

export const validateUsername = ([
  first,
  ...rest
]: string): boolean =>
  !/\d|[A-Z]/.test(first) &&
  rest.every((letter) =>
    /[a-z]|\d/.test(letter)
  );

export const getChange = <
  T extends Array<T>
>(
  prev: T,
  recent: T
): Map<number, T> => {
  const map = new Map();

  if (prev.length !== recent.length) {
    return map;
  }

  return prev.reduce(
    (map, prevItem, index) => {
      if (
        JSON.stringify(prevItem) !==
        JSON.stringify(recent[index])
      ) {
        map.set(index, recent[index]);
      }

      return map;
    },
    map
  );
};
