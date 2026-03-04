// ╔═══════════════════════════════════════════════════════════════╗
// ║  🔖 DYNAMIC FAVICON - Circle + First Letter of Site Name     ║
// ║  Generates SVG favicon based on SITE_TITLE from consts.ts    ║
// ╚═══════════════════════════════════════════════════════════════╝
import type { APIRoute } from 'astro';
import { SITE_BRAND } from '../consts';

// Prerender at build time for static hosting
export const prerender = true;

export const GET: APIRoute = () => {
  // Get first letter of brand name
  const firstLetter = SITE_BRAND.charAt(0).toUpperCase();
  
  // Navy blue circle with inner white ring and letter (Screened style)
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <circle cx="50" cy="50" r="48" fill="#1E2E5C"/>
  <circle cx="50" cy="50" r="40" fill="none" stroke="white" stroke-width="3"/>
  <text x="50" y="52" dominant-baseline="central" text-anchor="middle" 
        font-family="Georgia, 'Times New Roman', serif" 
        font-size="48" 
        font-weight="700" 
        fill="white">${firstLetter}</text>
</svg>`;

  return new Response(svg, {
    status: 200,
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=31536000, immutable'
    }
  });
};

