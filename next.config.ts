import type { NextConfig } from "next";

// Read per-preview asset prefix injected by the orchestrator
const assetPrefix = process.env.ASSET_PREFIX ?? "";

const nextConfig: NextConfig = {
  /**
   * Make Next emit JS/CSS/HMR and image optimizer under /p/<id>/_next/...
   * Your orchestrator should set ASSET_PREFIX=/p/<id> when starting `next dev`.
   */
  assetPrefix,

  /**
   * Ensure next/image optimizer also respects the prefix
   * (safe even if you don't use it).
   */
  images: {
    path: `${assetPrefix}/_next/image`,
  },

  /**
   * Optional: Ignore TypeScript errors during build (use cautiously)
   * Uncomment if you want to allow TypeScript errors to not block builds
   */
  // typescript: {
  //   ignoreBuildErrors: true,
  // },

  /**
   * Security headers
   * Allow embedding in iframes (required for Farcaster miniapp preview)
   */
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // Allow embedding from any origin
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors *",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
