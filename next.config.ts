import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async redirects() {
    return [
      // Legacy Webflow path referenced from the privacy policy.
      { source: "/contact", destination: "/contacta", permanent: true },
    ];
  },
};

export default nextConfig;
