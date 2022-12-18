module.exports = {
  apps: [
    {
      name: 'proxy-rotator',
      script: 'dist/apps/proxy-rotator/main.js',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        PROXY_PORT: 3000,
        MAX_RETRIES: 5,
        RETRY_DELAY: 3000,
        DATABASE_URL: 'postgresql://postgres:123456@localhost:5432/postgres',
      },
    },
    {
      name: 'api',
      script: 'dist/apps/api/main.js',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        API_PORT: 3333,
        JWT_SECRET: 'software-sheba-secret',
        DATABASE_URL: 'postgresql://postgres:123456@localhost:5432/postgres',
      },
    },
    // {
    //   name: 'client',
    //   cwd: 'C:\\Users\\Developer\\Desktop\\exp-proxy-manager\\dist\\apps\\client',
    //   script: 'yarn',
    //   args: 'start',
    //   env: {
    //     API_URL: 'http://localhost:3333',
    //   },
    // },
  ],
};
