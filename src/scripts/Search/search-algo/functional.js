import { compare } from '../../lib/helpers/compare'
/**
 * Filter Recipe Array with term.
 * @param {Recipe[]} arr 
 * @param {string} term 
 * @returns Recipe[]
 */
export const search_by_name = (arr, term) => arr.filter(({ name }) => name.toLowerCase().includes(term.toLowerCase()))

/**
 * Check if ingredient has include in recipe.
 * 
 * If term as an array call compare method 
 * to check recipe contains all terms 
 * @param {Recipe[]} arr 
 * @param {string | string[]} term 
 * @returns Recipe[]
 */
export const search_by_ingredient = (arr, term) => arr.filter(({ ingredients }) => {
  if (Array.isArray(term)) return ingredients.includes(...compare(term, ingredients))
  return ingredients.includes(...ingredients.filter(({ ingredient }) => ingredient.toLowerCase().includes(term.toLowerCase())))
})

/**
 * Check if ustentils has include in recipe.
 * 
 * If term is an array call compare method 
 * to check recipe contains all terms 
 * @param {Recipe[]} arr 
 * @param {string | string[]} term 
 * @returns Recipe[]
 */
export const search_by_ustensil = (arr, term) => arr.filter(({ ustensils }) => {
  if(Array.isArray(term)) return ustensils.includes(...compare(term, ustensils))
  return ustensils.includes(term)
})

/**
 * Check if ustentils has include in recipe.
 * 
 * @param {Recipe[]} arr 
 * @param {string | string[]} term 
 * @returns Recipe[]
 */
export const search_by_appliance = (arr, term) => arr.filter(({ appliance }) => {
  if(Array.isArray(term)) return appliance.includes(term)
  return appliance.toLowerCase().includes(term)
})
