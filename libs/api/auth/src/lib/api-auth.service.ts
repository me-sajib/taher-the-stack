import { ApiPrismaService } from '@api/prisma';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private prisma: ApiPrismaService) {}

  register() {
    return { message: 'Registered successful' };
  }

  login() {
    return { message: 'Logged in successful' };
  }
}
