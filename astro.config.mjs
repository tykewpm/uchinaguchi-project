// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build
export default defineConfig({
  site: 'https://uchinaguchiproject.org',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ja', 'es', 'pt-br'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
