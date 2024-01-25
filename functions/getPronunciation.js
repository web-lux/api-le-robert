const getElementProperty = require("../helpers/getElementProperty")
const createPage = require("../helpers/createPage");

async function getPronunciation(wordQuery) {
  const pageURL = `https://dictionnaire.lerobert.com/definition/${encodeURIComponent(
    wordQuery
  )}`

  const { browser, page } = await createPage(pageURL)

  const definitionsContainer = await page.$("#definitions")

  if (!definitionsContainer) {
    await browser.close()

    throw new Error(`No pronunciation found for "${wordQuery}"`)
  }

  const audioSourceURL = await getElementProperty(
    await page.$("audio > source"),
    "src"
  )

  await browser.close()

  return {
    audioURL: audioSourceURL
  }
}

module.exports = getPronunciation;