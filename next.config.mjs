/** @type {import('next').NextConfig} */
const nextConfig = {
	output: "standalone",
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "cdn.rainnny.club",
			},
			{
				protocol: "https",
				hostname: "bonfire.wtf",
			},
			{
				protocol: "https",
				hostname: "img.icons8.com",
			},
		],
	},
};
export default nextConfig;
