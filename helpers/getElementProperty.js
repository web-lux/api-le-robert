async function getElementProperty(element, propertyKey) {
   return await (await element.getProperty(propertyKey)).jsonValue()
}
 
module.exports = getElementProperty;