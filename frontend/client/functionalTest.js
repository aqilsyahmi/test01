const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/chromium-browser'
  });

  const page = await browser.newPage();
  await page.goto('http://18.143.174.103:3000'); // adjust this if your app URL is different

  const featuredProducts = await page.$$('.featured-products .product-card');
  console.assert(featuredProducts.length > 0, "No featured products found!");

  await browser.close();
})();
