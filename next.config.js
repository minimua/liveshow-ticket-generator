/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        canvas: false,
      };
    }
    config.externals.push({
      '@napi-rs/canvas': 'commonjs @napi-rs/canvas',
    });
    return config;
  },
}

module.exports = nextConfig