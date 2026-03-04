// ╔═══════════════════════════════════════════════════════════════╗
// ║  ⚙️ ASTRO CONFIG - Don't edit unless you know what you're doing ║
// ╚═══════════════════════════════════════════════════════════════╝

import tailwind from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import { defineConfig } from 'astro/config';

export default defineConfig({
  // 🌐 Your website URL (update this!)
  site: process.env.SITE_URL || 'https://www.webbuildhub.co',

  // 🔌 Integrations
  integrations: [sitemap()],

  // 🎨 Tailwind CSS
  vite: {
    plugins: [tailwind()],
  },

  // 📦 Static site output for Vercel
  output: 'static',
  adapter: vercel(),
  compressHTML: true,
});
