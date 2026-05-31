import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  retries: 1,
  use: {
    baseURL: 'https://zh.moegirl.org.cn',
    headless: !!process.env.CI,
    viewport: { width: 1280, height: 720 },
    locale: 'zh-CN',
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
  ],
});
