import { defineConfig } from '@apps-in-toss/web-framework/config';

export default defineConfig({
  appName: 'appintos-god-of-decision',
  brand: {
    displayName: '결정의 신',
    primaryColor: '#3182F6',
    icon: 'https://raw.githubusercontent.com/purple790779/appintos-god-of-decision/main/public/icon.png',
  },
  web: {
    host: 'localhost',
    port: 7777,
    commands: {
      dev: 'vite',
      build: 'tsc -b && vite build',
    },
  },
  permissions: [],
  outdir: 'dist',
});
