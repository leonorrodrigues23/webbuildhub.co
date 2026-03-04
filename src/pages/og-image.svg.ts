// ╔═══════════════════════════════════════════════════════════════╗
// ║  🖼️ DYNAMIC OG IMAGE - For Google Search & Social Sharing    ║
// ║  Generates 1200x630 SVG with circle logo + site name         ║
// ╚═══════════════════════════════════════════════════════════════╝
import type { APIRoute } from 'astro';
import { SITE_TITLE, SITE_BRAND, SITE_DESCRIPTION } from '../consts';

// Prerender at build time for static hosting
export const prerender = true;

export const GET: APIRoute = () => {
  // Get first letter of brand name
  const firstLetter = SITE_BRAND.charAt(0).toUpperCase();
  
  // Truncate description if too long
  const shortDesc = SITE_DESCRIPTION.length > 80 
    ? SITE_DESCRIPTION.substring(0, 77) + '...'
    : SITE_DESCRIPTION;
  
  // 1200x630 OG image (standard size for social sharing)
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <!-- Background -->
  <rect width="1200" height="630" fill="#FFFFFF"/>
  
  <!-- Subtle border -->
  <rect x="20" y="20" width="1160" height="590" fill="none" stroke="#E5E7EB" stroke-width="2" rx="8"/>
  
  <!-- Circle with letter -->
  <circle cx="600" cy="240" r="100" fill="#1E2E5C"/>
  <text x="600" y="240" dominant-baseline="central" text-anchor="middle" 
        font-family="Georgia, 'Times New Roman', serif" 
        font-size="90" 
        font-weight="700" 
        fill="white">${firstLetter}</text>
  
  <!-- Site name -->
  <text x="600" y="400" text-anchor="middle" 
        font-family="Georgia, 'Times New Roman', serif" 
        font-size="56" 
        font-weight="700" 
        fill="#1E2E5C">${SITE_TITLE}</text>
  
  <!-- Tagline -->
  <text x="600" y="470" text-anchor="middle" 
        font-family="system-ui, -apple-system, sans-serif" 
        font-size="24" 
        fill="#6B7280">Expert Reviews &amp; Buying Guides</text>
  
  <!-- Bottom accent line -->
  <rect x="500" y="520" width="200" height="4" fill="#1E2E5C" rx="2"/>
</svg>`;

  return new Response(svg, {
    status: 200,
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=31536000, immutable'
    }
  });
};

