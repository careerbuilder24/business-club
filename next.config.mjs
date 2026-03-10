/** @type {import('next').NextConfig} */
const nextConfig = {

    images: {
    domains: [
      "i.ibb.co", "i.ibb.co.com",  "lh3.googleusercontent.com", "ibb.co", "img.freepik.com", "lh3.googleusercontent.com", "i.postimg.cc", "postimg.cc"
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
