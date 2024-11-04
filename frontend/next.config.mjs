/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rdhuwtbpjqmiamvngwrb.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/banners/desktop/**",
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
};

export default nextConfig;
