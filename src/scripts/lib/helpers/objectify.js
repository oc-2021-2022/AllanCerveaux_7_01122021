/**
 * Transform object into array of object
 * @param {object} object
 * @returns object[] [{country: "France"}, {tags: ['events', 'portrait']}]
 * @example
 * objectify({{country: "France"}, {tags: ['events', 'portrait']}})
 */
 export const objectify = (object) => {
  const arr = []
  for (const key in object) {
    const obj = {}
    obj[key] = object[key]
    arr.push(obj)
  }
  return arr
}
