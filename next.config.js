/** @type {import('next').NextConfig} */
const cron = require('node-cron');
cron.schedule('*/2 * * * *', () => {
    function makeid(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
          counter += 1;
        }
        return result;
    }
  const pokeBackend = async () => {
        console.log("poke backend");
        const randSearch = makeid(2)
        const result = await fetch(
            "https://botzone.onrender.com/" + `api/product/search/${randSearch}`
        );
        const data = await result.json();
        console.log(data);
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
