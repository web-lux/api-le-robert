const ppt = require("puppeteer");

async function createPage(url) {
  const browser = await ppt.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  })

  const page = await browser.newPage()

  await page.goto(url)

  return {
    browser,
    page
  }
}

module.exports = createPage;