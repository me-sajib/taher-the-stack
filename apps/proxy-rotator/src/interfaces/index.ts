export interface RotateProxy {
    host: string;
    port: number;
    auth: string
}

export interface Options {
    port: number;
    hostname: string;
    method: string;
    path: string;
    headers: unknown;
}
