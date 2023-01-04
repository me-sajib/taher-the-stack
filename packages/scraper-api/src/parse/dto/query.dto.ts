import { ApiProperty } from '@nestjs/swagger';

export class ParseQueryDto {
  @ApiProperty({
    name: 'access_token',
    type: String,
    required: true,
    description:
      'This is access token of the api, you must be send a valid token to access the api'
  })
  access_token: string;

  @ApiProperty({
    name: 'url',
    type: String,
    required: true,
    description:
      'URL of your target website that you would like to scrape'
  })
  url: string;

  @ApiProperty({
    name: 'render',
    type: Boolean,
    required: false,
    description:
      "The javascript rendering is enable when it's true (default: false)"
  })
  render?: string;

  @ApiProperty({
    name: 'keep_headers',
    type: Boolean,
    required: false,
    description:
      'The passed header will be send as your request header (default: false)'
  })
  keep_headers?: string;
}
