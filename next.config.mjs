/** @type {import('next').NextConfig} */

const nextConfig = {};

export default {
    ...nextConfig,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '*',
            },
        ],
    }
};