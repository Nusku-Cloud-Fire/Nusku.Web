import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // Azure Static Web Apps has no next/image optimizer, so the loader would
    // 404 at runtime. Serving the files as-is costs almost nothing here: 32 of
    // the 51 assets are already AVIF and 14 are SVG, both from the Webflow
    // migration. Revisit only if large unoptimized sources are added.
    unoptimized: true,
  },
  // A stray package-lock.json in the home directory makes Next infer the wrong
  // workspace root, which breaks file tracing on deploy. Pin it to this repo.
  outputFileTracingRoot: path.join(__dirname),
  // In a hybrid deploy Next serves the pages itself, so the `globalHeaders` in
  // staticwebapp.config.json never reach them — verified against the deployed
  // site. Setting them here is what actually applies them.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // Legacy Webflow path referenced from the privacy policy.
      { source: "/contact", destination: "/contacta", permanent: true },
    ];
  },
};

export default nextConfig;
