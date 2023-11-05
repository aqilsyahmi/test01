const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/chromium-browser',
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();
  await page.goto('http://18.143.174.103:3000'); // adjust this if your app URL is different

  // Wait for 15 seconds
  await new Promise(resolve => setTimeout(resolve, 15000)); 

  // Check for the "Featured Products" heading
  const heading = await page.$x("//*[text()='Featured Products']");
  console.assert(heading.length > 0, "Heading 'Featured Products' not found!");

  await browser.close();
})();
