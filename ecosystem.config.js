module.exports = {
  apps: [
    {
      name: 'proxy-rotator',
      script:
        'dist/apps/proxy-rotator/main.js',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        MAX_RETRIES:
          process.env.MAX_RETRIES,
        RETRY_DELAY:
          process.env.RETRY_DELAY,
        DATABASE_URL:
          process.env.DATABASE_URL
      }
    },
    {
      name: 'api',
      script: 'dist/apps/api/main.js',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        JWT_SECRET:
          'software-sheba-secret',
        DATABASE_URL:
          process.env.DATABASE_URL
      }
    }
  ]
};
