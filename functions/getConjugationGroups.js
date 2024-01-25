const getElementProperty = require("../helpers/getElementProperty")
const createPage = require("../helpers/createPage");

async function getConjugationGroups(verbQuery) {
  const pageURL = `https://dictionnaire.lerobert.com/conjugaison/${encodeURIComponent(
    verbQuery
  )}`

  const { browser, page } = await createPage(pageURL)

  const conjugationsContainer = await page.$(".conj_verbe")

  if (!conjugationsContainer) {
    await browser.close()

    throw new Error(`No conjugations found for "${verbQuery}"`)
  }

  const conjugationGroups = []

  for (const group of await page.$$(".conj")) {
    const groupName = await getElementProperty(
      await group.$("h2"),
      "textContent"
    )

    const conjugationGroup = {
      name: groupName,
      subgroups: []
    }

    for (const subgroupNameElement of await group.$$(".cf-b")) {
      const subgroupName = await getElementProperty(
        subgroupNameElement,
        "textContent"
      )

      const tenses = await subgroupNameElement.evaluate(element => {
        const sibling = element.nextElementSibling
        const tenses = []

        for (let i = 0; i < sibling.childElementCount; i++) {
          const children = sibling.children[i]

          const tenseName = children.querySelector("h4").textContent
          const conjugationsCollection = children.querySelectorAll("p")

          const conjugations = []

          for (let i = 0; i < conjugationsCollection.length; i++) {
            const conjugationItem = conjugationsCollection[i]

            conjugations.push(conjugationItem.textContent)
          }

          tenses.push({
            name: tenseName,
            conjugations
          })
        }

        return tenses
      })

      conjugationGroup.subgroups.push({
        name: subgroupName,
        tenses
      })
    }

    conjugationGroups.push(conjugationGroup)
  }

  await browser.close()

  return conjugationGroups
}

module.exports = getConjugationGroups;