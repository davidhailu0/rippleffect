/** @type {import('next').NextConfig} */
const nextConfig = {
    output:'export',
    distDir:'out',
    trailingSlash:true,
    // reactStrictMode:false
    typescript:{
        ignoreBuildErrors:true
    }
};

export default nextConfig;
