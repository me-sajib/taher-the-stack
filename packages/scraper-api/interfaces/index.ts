export interface Proxy {
  host: string;
  port: number;
  auth: {
    username: string;
    password: string;
  };
}

export interface ExtractResponse {
  [key: string]:
    | string
    | string[]
    | ExtractResponse[]
    | ExtractResponse;
}
