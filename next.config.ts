import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "external-preview.redd.it",
      "preview.redd.it"
    ],
  },
};

export default nextConfig;
