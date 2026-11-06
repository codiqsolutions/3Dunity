// backend/src/routes/sitemap.js
const express = require('express');
const router = express.Router();

// Very simple sitemap generation for public pages
const pages = [
  '/',
  '/about',
  '/products',
  '/services',
  '/process',
  '/gallery',
  '/contact',
  '/privacy-policy',
  '/terms',
];

router.get('/', (req, res) => {
  const base = `${req.protocol}://${req.get('host')}`;
  const urls = pages.map((p) => `<url><loc>${base}${p}</loc></url>`).join('');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
  res.type('application/xml');
  res.send(xml);
});

module.exports = router;

