import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
	forbidOnly: !!process.env.CI,
	// fullyParallel: true,
	webServer: {
		command: 'pnpm run build && pnpm run preview',
		port: 3001
	}
};

export default config;
