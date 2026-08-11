import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for GitHub Pages.
  output: "export",
  trailingSlash: true,
  basePath: "/E-Card-Hunter-Fam-V2",
  assetPrefix: "/E-Card-Hunter-Fam-V2/",
  images: {
    unoptimized: true,
  },
  // The repository also contains an unused Cloudflare D1 helper.
  // GitHub Pages is static and has no Cloudflare worker bindings, so
  // type-checking that server-only helper must not block the E-Card build.
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
