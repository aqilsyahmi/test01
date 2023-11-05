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
        console.log(`Attempting to navigate to: ${url}`);

        for (let i = 0; i < maxRetries; i++) {
            try {
                await page.goto(url, { timeout: 30000 }); // wait up to 30 seconds
                console.log(`Successfully navigated to ${url} on attempt ${i + 1}`);
                success = true;
                break; // exit loop if successful
            } catch (error) {
                console.warn(`Attempt ${i + 1} to navigate to ${url} failed. Retrying...`);

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
        console.error("Failed to navigate to any of the specified URLs.");
        process.exit(1); // Fail the script if none of the URLs were successful
    }

    // Check for the "Featured Products" heading
    const heading = await page.$x("//*[text()='Featured Products']");

    if (heading.length > 0) {
        console.log("Heading 'Featured Products' found!");
    } else {
        console.error("Heading 'Featured Products' not found!");
        process.exit(1);  // Fail the script if the heading isn't found
    }

    await browser.close();
})();
