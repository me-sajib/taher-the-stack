import { RequestError } from 'proxy-chain';

export const createCustomError = (
  message: string,
  statusCode: number
) => {
  const errorResponse = {
    message,
    statusCode
  };

  const headers = {
    'Content-Type': 'application/json'
  };

  return new RequestError(
    JSON.stringify(
      errorResponse,
      null,
      2
    ),
    statusCode,
    headers
  );
};
