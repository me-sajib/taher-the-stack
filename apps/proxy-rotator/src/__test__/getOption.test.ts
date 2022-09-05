import * as MockReq from 'mock-req';
import getOptions from '../helpers/getOptions';
it('Testing the get option function except ssl', async () => {
  const req = new MockReq({
    method: 'GET',
    url: 'http://httpbin.org/ip',
  });

  expect(
    getOptions(req, {
      host: '123.23.23.42',
      port: 4534,
      auth: 'username:password',
    })
  ).toEqual({
    hostname: '123.23.23.42',
    port: 4534,
    method: 'GET',
    path: 'http://httpbin.org/ip',
    headers: {
      'Proxy-Authorization': 'Basic dXNlcm5hbWU6cGFzc3dvcmQ=',
    },
  });
});

it('Testing the get option function with ssl', async () => {
  const req = new MockReq({
    method: 'CONNECT',
    url: 'http://example.com',
  });

  expect(
    getOptions(
      req,
      {
        host: '185.199.228.220',
        port: 6082,
        auth: 'username2:password2',
      },
      true
    )
  ).toEqual({
    hostname: '185.199.228.220',
    port: 6082,
    method: 'CONNECT',
    path: 'http:80',
    headers: {
      'Proxy-Authorization': 'Basic dXNlcm5hbWUyOnBhc3N3b3JkMg==',
    },
  });
});
