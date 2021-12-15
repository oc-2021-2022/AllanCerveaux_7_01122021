
export const search_by_name = (arr, term) => arr.filter(({ name }) => name.toLowerCase().includes(term.toLowerCase()))


export const search_by_ingredient = (arr, term) => arr.filter(({ ingredients }) => {
  const result = ingredients.filter(({ ingredient }) => ingredient.toLowerCase().includes(term.toLowerCase()))
  if (result.length) {
    return ingredients.includes(...result)
  }
})

export const search_by_ustensil = (arr, term) => arr.filter(({ ustensils }) => ustensils.includes(term))

export const search_by_appliance = (arr, term) => arr.filter(({ appliance }) => appliance.toLowerCase().includes(term))
