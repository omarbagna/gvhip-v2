const path = require('path');

module.exports = {
	trailingSlash: true,
	sassOptions: {
		includePaths: [path.join(__dirname, 'styles')],
	},
	reactStrictMode: true,
	eslint: {
		// Warning: This allows production builds to successfully complete even if
		// your project has ESLint errors.
		ignoreDuringBuilds: true,
	},
	images: {
		domains: ['chart.googleapis.com', 'gvhip-v2.netlify.app', 'localhost:3000'],
		/*
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**',
				port: '',
				pathname: '**',
			},
		],
		loader: 'akamai',
		path:
			process.env.NODE_ENV === 'production'
				? 'https://gvhip-v2.netlify.app'
				: 'http://localhost:3000',
				*/
	},
	optimizeFonts: false,
};
