/** @type {import('next').NextConfig} */
console.log('Loading next.config.js with output: export');
const nextConfig = {
    output: 'export',
    images: {
        unoptimized: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
};

module.exports = nextConfig;
