import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import EnvironmentPlugin from 'vite-plugin-environment';
// import vitePluginImportus from 'vite-plugin-importus';
import { compression } from 'vite-plugin-compression2';
import { chunkSplitPlugin } from 'vite-plugin-chunk-split';

/** @type {import('vite').UserConfig} */
const config = defineConfig(({ command, mode }) => ({
	plugins: [
		sveltekit(),
		chunkSplitPlugin(),
		EnvironmentPlugin({
			APP_ENV: 'development',
			PUBLIC_SECRET_NETWORK_CHAIN_ID: undefined,
			PUBLIC_SECRET_NETWORK_GRPC_URL: undefined,
			CELADON_URL: undefined
		}),
		compression()
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

export default config;
