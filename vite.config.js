import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import EnvironmentPlugin from 'vite-plugin-environment';

/** @type {import('vite').UserConfig} */
export default defineConfig(({ command, mode }) => ({
	plugins: [
		sveltekit(),
		EnvironmentPlugin({
			APP_ENV: 'development',
			PUBLIC_SECRET_NETWORK_CHAIN_ID: undefined,
			PUBLIC_SECRET_NETWORK_GRPC_URL: undefined,
			CELADON_URL: undefined
		})
	],
	server: {
		proxy: {
			'/api': {
				target: process.env.CELADON_URL,
				changeOrigin: true,
				secure: process.env.APP_ENV === 'production',
				rewrite: (path) => path.replace(/^\/api/, '')
			}
		}
	}
}));

console.log({
	config: {
		APP_ENV: process.env.APP_ENV,
		CELADON_URL: process.env.CELADON_URL,
		PUBLIC_SECRET_NETWORK_CHAIN_ID: process.env.PUBLIC_SECRET_NETWORK_CHAIN_ID,
		PUBLIC_SECRET_NETWORK_GRPC_URL: process.env.PUBLIC_SECRET_NETWORK_GRPC_URL
	}
});
