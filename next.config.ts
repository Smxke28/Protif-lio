import type { NextConfig } from "next";

// Sites demo exibidos no carrossel da home (iframes)
const DEMO_HOSTS = [
  "https://site-salao-drab.vercel.app",
  "https://site-barbearia-gilt.vercel.app",
  "https://site-academia-six-red.vercel.app",
  "https://site-contabilidade-three.vercel.app",
  "https://site-advocacia-henna-beta.vercel.app",
  "https://site-clinica-estetica-e-odontologia.vercel.app",
  "https://clinica-medica-two-sigma.vercel.app",
  "https://site-mecanica-eight.vercel.app",
  "https://site-pet-nine.vercel.app",
].join(" ");

const nextConfig: NextConfig = {
  reactStrictMode: true,

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY"
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff"
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin"
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload"
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()"
          },
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; " +
              "script-src 'self' 'unsafe-eval' 'unsafe-inline'; " +
              "style-src 'self' 'unsafe-inline'; " +
              "img-src 'self' data: https:; " +
              "font-src 'self' data:; " +
              "connect-src 'self'; " +
              "frame-src 'self' " + DEMO_HOSTS + ";"
          }
        ]
      }
    ];
  }
};

export default nextConfig;