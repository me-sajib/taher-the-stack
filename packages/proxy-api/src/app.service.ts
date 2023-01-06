import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth() {
    return {
      statusCode: 200,
      message: 'I am Ok ;)'
    };
  }
}
