/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  distDir: "build",
  trailingSlash: true,
  // reactStrictMode:false
  // typescript: {
  //   ignoreBuildErrors: true,
  // },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
