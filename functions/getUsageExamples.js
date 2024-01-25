const getElementProperty = require("../helpers/getElementProperty")
const createPage = require("../helpers/createPage");

async function getUsageExamples(wordQuery) {
  const pageURL = `https://dictionnaire.lerobert.com/definition/${encodeURIComponent(
    wordQuery
  )}`

  const { browser, page } = await createPage(pageURL)

  const definitionsContainer = await page.$("#definitions")

  if (!definitionsContainer) {
    await browser.close()

    throw new Error(`No usage examples found for "${wordQuery}"`)
  }

  const usageExamples = []

  for (const exampleContainer of await page.$$(".ex_example")) {
    const example = await getElementProperty(exampleContainer, "textContent")

    const sourceElement = await exampleContainer.$("a.ex_author")

    const sourceName = await getElementProperty(sourceElement, "textContent")
    const sourceURL = await getElementProperty(sourceElement, "href")

    usageExamples.push({
      value: example.replace(sourceName, ""),
      source: {
        value: sourceName,
        url: sourceURL
      }
    })
  }

  await browser.close()

  return usageExamples
}

module.exports = getUsageExamples;