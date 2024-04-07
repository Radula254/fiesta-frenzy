/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '*.googleusercontent.com'
            },
            {
                protocol: 'https',
                hostname: 'josh-food-ordering-app.s3.amazonaws.com', // Corrected hostname
            },
        ]
    }
};

export default nextConfig;
