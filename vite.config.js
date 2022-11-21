import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import EnvironmentPlugin from 'vite-plugin-environment';

/** @type {import('vite').UserConfig} */
const config = defineConfig(({ command, mode }) => ({
	plugins: [
		sveltekit(),
		EnvironmentPlugin({
			APP_ENV: 'development',
			PUBLIC_SECRET_NETWORK_CHAIN_ID: undefined,
			PUBLIC_SECRET_NETWORK_GRPC_URL: undefined,
			CELADON_URL: undefined
		})
	],
	optimizeDeps: {
		include: ['highlight.js', 'highlight.js/lib/core']
	},
	server: {
		proxy: {
			'/api': {
				target: 'http://127.0.0.1:3000',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, '')
			}
		}
	}
}));

console.log({
	APP_ENV: process.env.APP_ENV,
	CELADON_URL: process.env.CELADON_URL,
	PUBLIC_SECRET_NETWORK_GRPC_URL: process.env.PUBLIC_SECRET_NETWORK_GRPC_URL,
	PUBLIC_SECRET_NETWORK_CHAIN_ID: process.env.PUBLIC_SECRET_NETWORK_CHAIN_ID
});

export default config;
