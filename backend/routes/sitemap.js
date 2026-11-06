// backend/routes/sitemap.js
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// @desc  Simple XML sitemap
// @route GET /api/sitemap
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({ isActive: true }).select('slug updatedAt').lean();
    const baseUrl = process.env.SITE_URL || 'https://3dunity.com';

    const staticRoutes = [
      { loc: '/', priority: '1.0', changefreq: 'weekly' },
      { loc: '/products', priority: '0.9', changefreq: 'daily' },
      { loc: '/services', priority: '0.8', changefreq: 'monthly' },
      { loc: '/about', priority: '0.7', changefreq: 'monthly' },
      { loc: '/gallery', priority: '0.7', changefreq: 'weekly' },
      { loc: '/contact', priority: '0.7', changefreq: 'monthly' },
      { loc: '/process', priority: '0.6', changefreq: 'monthly' },
      { loc: '/privacy-policy', priority: '0.3', changefreq: 'yearly' },
      { loc: '/terms', priority: '0.3', changefreq: 'yearly' },
    ];

    const productRoutes = products.map((p) => ({
      loc: `/products/${p.slug}`,
      priority: '0.8',
      changefreq: 'weekly',
      lastmod: p.updatedAt ? new Date(p.updatedAt).toISOString().split('T')[0] : '',
    }));

    const allRoutes = [...staticRoutes, ...productRoutes];

    const urlEntries = allRoutes
      .map(
        (r) =>
          `  <url>\n    <loc>${baseUrl}${r.loc}</loc>\n    ${r.lastmod ? `<lastmod>${r.lastmod}</lastmod>\n    ` : ''}<changefreq>${r.changefreq}</changefreq>\n    <priority>${r.priority}</priority>\n  </url>`
      )
      .join('\n');

    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlEntries}\n</urlset>`;

    res.header('Content-Type', 'application/xml');
    res.send(xml);
  } catch (err) {
    res.status(500).json({ error: 'Sitemap generation failed.' });
  }
});

module.exports = router;

