import { compare } from '../../lib/helpers/compare'

export const search_by_name = (arr, term) => arr.filter(({ name }) => name.toLowerCase().includes(term.toLowerCase()))

export const search_by_ingredient = (arr, term) => arr.filter(({ ingredients }) => {
  if (Array.isArray(term)) return ingredients.includes(...compare(term, ingredients))
  return ingredients.includes(...ingredients.filter(({ ingredient }) => ingredient.toLowerCase().includes(term.toLowerCase())))
})

export const search_by_ustensil = (arr, term) => arr.filter(({ ustensils }) => {
  if(Array.isArray(term)) return ustensils.includes(...compare(term, ustensils))
  return ustensils.includes(term)
})

export const search_by_appliance = (arr, term) => arr.filter(({ appliance }) => {
  if(Array.isArray(term)) return appliance.includes(term)
  return appliance.toLowerCase().includes(term)
})
