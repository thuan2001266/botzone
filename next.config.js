/** @type {import('next').NextConfig} */
const cron = require('node-cron');
cron.schedule('*/5 * * * *', () => {
  const pokeBackend = async () => {
        console.log("poke backend");
        const result = await fetch(
            "https://botzone.onrender.com/" + `api/product`
        );
        const data = await result.json();
    };
    pokeBackend()
});
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
