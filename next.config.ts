import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: "/E-Card-Hunter-Fam-V2",
  assetPrefix: "/E-Card-Hunter-Fam-V2/",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
