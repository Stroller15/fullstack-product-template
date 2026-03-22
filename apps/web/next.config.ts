import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@my-app/types", "@my-app/validators"],
  experimental: {
    typedRoutes: true,
  },
};

export default nextConfig;
