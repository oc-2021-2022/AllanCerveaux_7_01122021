import { compare } from '../../lib/helpers/compare';

/**
 * Filter Recipe Array with term.
 * @param {Recipe[]} arr 
 * @param {string} term 
 * @returns Recipe[]
 */
export const search_by_name = (arr, term) => {
  const result = []
  for (let i = 0; i < arr.length; i++) {
    const recipe = arr[i];
    if (recipe.hasOwnProperty('name')) {
      if (recipe.name.toLocaleLowerCase().includes(term)) {
        result.push(recipe)
      }
    }
  }
  return result
}

/**
 * Check if ingredient has include in recipe.
 * 
 * If term as an array call compare method 
 * to check recipe contains all terms 
 * @param {Recipe[]} arr 
 * @param {string | string[]} term 
 * @returns Recipe[]
 */
export const search_by_ingredient = (arr, term) => {
  const result = []
  for (let i = 0; i < arr.length; i++) {
    const recipe = arr[i];
    if (recipe.hasOwnProperty('ingredients')) {
      const ingredients = arr[i].ingredients
      if (Array.isArray(term)) {
        if (ingredients.includes(...compare(term, ingredients))) {
          result.push(recipe)
        }
      } else {
        for (const key in ingredients) {
          const ingredient = ingredients[key];
          if (ingredient.hasOwnProperty('ingredient')) {
            if (ingredient.ingredient.toLowerCase().includes(term.toLocaleLowerCase())) {
              result.push(recipe)
            }
          }
        }
      }
    }
  }
  return result
}

/**
 * Check if ustentils has include in recipe.
 * 
 * If term is an array call compare method 
 * to check recipe contains all terms 
 * @param {Recipe[]} arr 
 * @param {string | string[]} term 
 * @returns Recipe[]
 */
export const search_by_ustensil = (arr, term) => {
  const result = []
  for (let i = 0; i < arr.length; i++) {
    const recipe = arr[i];
    if (recipe.hasOwnProperty('ustensils')) {
      if (Array.isArray(term)) {
        if (recipe.ustensils.includes(...compare(term, recipe.ustensils))) {
          result.push(recipe)
        }
      } else {
        if (recipe.ustensils.includes(term)) {
          result.push(recipe)
        }
      }
    }
  }
  return result
}

/**
 * Check if ustentils has include in recipe.
 * 
 * @param {Recipe[]} arr 
 * @param {string | string[]} term 
 * @returns Recipe[]
 */
export const search_by_appliance = (arr, term) => {
  const result = []
  for (let i = 0; i < arr.length; i++) {
    const recipe = arr[i];
    if (recipe.hasOwnProperty('appliance')) {
      if (recipe.appliance.toLowerCase().includes(term) || recipe.appliance.includes(term)) {
        result.push(recipe)
      }
    }
  }
  return result
}