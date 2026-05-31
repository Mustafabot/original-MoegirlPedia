import { test, expect } from '@playwright/test';
import path from 'path';

test('脚本可在萌娘百科页面加载', async ({ page }) => {
  const logs: string[] = [];
  page.on('console', (msg) => {
    if (msg.type() === 'log') {
      logs.push(msg.text());
    }
  });

  await page.goto('/');
  await page.addScriptTag({
    path: path.resolve(__dirname, '../dist/index/index.min.js'),
  });

  await expect.poll(() => logs).toContainEqual(
    expect.stringContaining('original-moegirlpedia: loaded'),
  );
});
