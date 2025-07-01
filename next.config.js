/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "frameitup.store",
      },
    ],
  },
};

console.log(
  "DEBUG: UPLOADTHING_SECRET in next.config.js:",
  process.env.UPLOADTHING_SECRET ? "Exists" : "MISSING",
);
console.log(
  "DEBUG: UPLOADTHING_APP_ID in next.config.js:",
  process.env.UPLOADTHING_APP_ID ? "Exists" : "MISSING",
);

module.exports = nextConfig;
