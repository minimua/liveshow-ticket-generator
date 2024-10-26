/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  webpack: (config: any, { isServer }: { isServer: boolean }) => {
    if (isServer) {
      config.externals.push({
        'canvas': 'commonjs canvas',
        'jimp': 'commonjs jimp'
      })
    }
    return config
  }
}

module.exports = nextConfig