import type { NextConfig } from "next";
import { hostname } from "os";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [

      {
        protocol: 'https',
        hostname: '*'
      }]
  }
};

export default nextConfig;
