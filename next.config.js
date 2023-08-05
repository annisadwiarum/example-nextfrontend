/** @type {import('next').NextConfig} */
const nextConfig = {
  compilerOptions: {
    baseUrl: '.',
    paths: {
      '@/helper/*': ['./src/helper/*'],
    },
  },
};

module.exports = nextConfig;
