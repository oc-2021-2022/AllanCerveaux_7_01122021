import { recipes } from '../../../resources/data/recipes.json';

export const search_by_name = (term) => {
  const result = []
  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    if (recipe.hasOwnProperty('name')) {
      if (recipe.name.toLocaleLowerCase().includes(term)) {
        result.push(recipe)
      }
    }
  }
  return result
}

export const search_by_ingredient = (term) => {
  const result = []
  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    if (recipe.hasOwnProperty('ingredients')) {
      const ingredients = recipes[i].ingredients
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
  return result
}

export const search_by_ustensil = (term) => {
  const result = []
  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    if (recipe.hasOwnProperty('ustensils')) {
      if (recipe.ustensils.includes(term)) {
        result.push(recipe)
      }
    }
  }
  return result
}

export const search_by_appliance = (term) => {
  const result = []
  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    if (recipe.hasOwnProperty('appliance')) {
      if (recipe.appliance.toLowerCase().includes(term)) {
        result.push(recipe)
      }
    }
  }
  return result
}
