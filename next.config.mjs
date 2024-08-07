/** @type {import('next').NextConfig} */
import withVideos from "next-videos";

const nextConfig = {};

export default {
    ...nextConfig,
    ...withVideos(),
    images: {
        domains: ['geovilluercas.org'],
    },
};