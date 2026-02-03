import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Force project dir as root so builds match local even when parent has stray package.json (e.g. on host)
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
