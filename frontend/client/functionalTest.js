const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/chromium-browser',
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();
  let maxRetries = 5;
  for (let i = 0; i < maxRetries; i++) {
    try {
      await page.goto('http://18.143.174.103:3000', { timeout: 30000 }); // wait up to 30 seconds
      break; // exit loop if successful
    } catch (error) {
      if (i === maxRetries - 1) {
        throw error; // if last retry, throw the error
      }
      await new Promise(resolve => setTimeout(resolve, 3000)); // wait 3 seconds before retrying
    }
  }

  // Check for the "Featured Products" heading
  const heading = await page.$x("//*[text()='Featured Products']");
  console.assert(heading.length > 0, "Heading 'Featured Products' not found!");

  await browser.close();
})();
