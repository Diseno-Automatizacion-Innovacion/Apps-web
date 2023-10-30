/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "strapi.garcalia.com",
                port: "",
                pathname: "/**"
            }
        ]
    }
}

module.exports = nextConfig
