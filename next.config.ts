import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // A stray package-lock.json in the home directory makes Next infer the wrong
  // workspace root, which breaks file tracing on deploy. Pin it to this repo.
  outputFileTracingRoot: path.join(__dirname),
  async redirects() {
    return [
      // Legacy Webflow path referenced from the privacy policy.
      { source: "/contact", destination: "/contacta", permanent: true },
    ];
  },
};

export default nextConfig;
