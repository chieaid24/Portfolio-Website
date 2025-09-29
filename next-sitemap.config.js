/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://aidanchien.com', // your domain
  generateRobotsTxt: true,          // creates robots.txt
  sitemapSize: 7000,
  changefreq: 'weekly',
  priority: 0.7,
  exclude: ['/private-page'],       // paths you don’t want indexed
};
