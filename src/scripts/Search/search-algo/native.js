import { compare } from '../../lib/helpers/compare';
import { strNormalizer } from '../../lib/helpers/strNomalizer';

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
      if (strNormalizer(recipe.name).toLocaleLowerCase().includes(term)) {
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
      const ingredients = recipe.ingredients
      if (Array.isArray(term)) {
        if (ingredients.includes(...compare(term, ingredients))) {
          result.push(recipe)
        }
      } else {
        for (let j = 0; j < ingredients.length; j++) {
          const payload = ingredients[j];
          if (strNormalizer(payload.ingredient).includes(term)) {
            result.push(recipe)
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
      const ustensils = recipe.ustensils
      if (Array.isArray(term)) {
        if (ustensils.includes(...compare(term, recipe.ustensils))) {
          result.push(recipe)
        }
      } else {
        for (let j = 0; j < ustensils.length; j++) {
          const ustensil = ustensils[j];
          if (strNormalizer(ustensil).includes(term)) {
            result.push(recipe)
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
 * @param {Recipe[]} arr 
 * @param {string | string[]} term 
 * @returns Recipe[]
 */
export const search_by_appliance = (arr, term) => {
  const result = []
  for (let i = 0; i < arr.length; i++) {
    const recipe = arr[i];
    if (recipe.hasOwnProperty('appliance')) {
      if (strNormalizer(recipe.appliance).includes(term)) {
        result.push(recipe)
      }
    }
  }
  return result
}
