export interface RotateProxy {
  host: string;
  port: number;
  auth: string;
}

export interface ProxyRes {
  isAuth: boolean;
  upstreamUrl: string;
}
