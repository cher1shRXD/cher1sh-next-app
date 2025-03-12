import type { NextConfig } from "next";
import {API_URL} from "@/constants/api";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: API_URL.split("://")[0] as "http" | "https",
        hostname: API_URL.split("://")[1].split(":")[0],
        port: API_URL.split(":")[2] || "",
        pathname: "/images/**.webp",
      },
    ],
  },};

export default nextConfig;
