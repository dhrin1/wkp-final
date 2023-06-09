/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    "BASE_URL": "http://localhost:3000",
    "MONGODB_URL": "mongodb+srv://alhdev97:Kya4zT61Q0D7xb3V@cluster0.t856lkq.mongodb.net/?retryWrites=true&w=majority",
    "ACCESS_TOKEN_SECRET": "319873223219889434083973DDD",
    "REFRESH_TOKEN_SECRET": "9977o7932161113323434209C2m",
    "PAYPAL_CLIENT_ID": "AYI2M7jlFYKISrPEN4KsUk1JYODJE3nl0jw6Ppy3awkedTSfNdH7tyT6uwCyIBjV705m_enNvIu-YhLe",
    "CLOUD_UPDATE_PRESET": "wkp_store",
    "CLOUD_NAME": "dhrin1",
    "CLOUD_API": "https://api.cloudinary.com/v1_1/dhrin1/image/upload"
  },
  images: {
    domains: ['res.cloudinary.com', 'example2.com'],
  },
}

module.exports = nextConfig
