/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true
  },
  experimental: {
    largePageDataBytes: 128 * 100000,
    serverActions: {
      bodySizeLimit: '10mb'  // 增加服务器端操作的大小限制
    }
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