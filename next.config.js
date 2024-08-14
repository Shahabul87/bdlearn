/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'utfs.io',
            // Optionally, you can specify a port and pathname prefix
            // port: '',
            // pathname: '/path/to/images/*',
          },
          {
            protocol: 'https',
            hostname: 'assets.aceternity.com',
            // Optionally, you can specify a port and pathname prefix
            // port: '',
            // pathname: '/path/to/images/*',
          },
         
        ],
      },
}

module.exports = nextConfig
