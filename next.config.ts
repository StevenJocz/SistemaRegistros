import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5059/api",
  },
  images: {
    domains: ["localhost",'edteam-media.s3.amazonaws.com', 'media.licdn.com', ], // Agrega el dominio de tu imagen
  },
};

export default nextConfig;
