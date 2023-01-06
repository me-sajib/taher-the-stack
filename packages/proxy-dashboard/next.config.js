//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const nextConfig = {
  rewrites: async () => [
    {
      source: '/api/:slug*',
      destination: `${
        process.env.API_URL || `http://localhost:3333/api`
      }/:slug*`
    }
  ]
};

module.exports = nextConfig;
