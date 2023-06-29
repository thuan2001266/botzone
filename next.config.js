/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
};
module.exports = {
    async rewrites() {
        return [
            {
                source: "/api/:path*",
                destination: "https://botzone.onrender.com/:path*",
            },
        ];
    },
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
      },
      eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
      },

    images: {
        domains: ['cdn.tgdd.vn'],
      },
    // images: {
    //     remotePatterns: [
    //       {
    //         protocol: 'https',
    //         hostname: 'cdn.tgdd.vn',
    //         port: '',
    //         pathname: '/**',
    //       },
    //     ],
    //   },
};
module.exports = nextConfig;
