const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/chromium-browser',
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();
  
  // Set an array of possible URLs
  const possibleURLs = ['http://18.143.174.103:3000', 'https://www.testserver.eloquent-ganguly.cloud/'];
  let success = false;

  for (let url of possibleURLs) {
    let maxRetries = 5;
    for (let i = 0; i < maxRetries; i++) {
      try {
        await page.goto(url, { timeout: 30000 }); // wait up to 30 seconds
        success = true;
        break; // exit loop if successful
      } catch (error) {
        if (i === maxRetries - 1) {
          console.error(`Failed to navigate to ${url} after ${maxRetries} retries.`);
        } else {
          await new Promise(resolve => setTimeout(resolve, 3000)); // wait 3 seconds before retrying
        }
      }
    }
    if (success) {
      break; // exit the outer loop if one of the URLs was successful
    }
  }

  if (!success) {
    throw new Error("Failed to navigate to any of the specified URLs.");
  }

  // Check for the "Featured Products" heading
  const heading = await page.$x("//*[text()='Featured Products']");
  console.assert(heading.length > 0, "Heading 'Featured Products' not found!");

  await browser.close();
})();
