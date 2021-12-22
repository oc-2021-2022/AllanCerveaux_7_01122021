export function compare(terms, arr) {
  let result
  let previousValue = null
  terms.forEach(term => {
    result = arr.filter((value) => {
      if (value.hasOwnProperty('ingredient')) {
        value = value['ingredient']
      }

      if (value.includes(term)) {
        if(previousValue !== null && value.includes(term)) return true
        previousValue = term
        return true
      }
      return false
    })
  })
  return result
}
