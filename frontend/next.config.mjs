/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rdhuwtbpjqmiamvngwrb.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/banners/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
      }
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  output: 'standalone',
  experimental: {
    // This will allow server components to be built properly
    serverActions: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
