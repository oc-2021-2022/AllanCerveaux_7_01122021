
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

export const search_by_ingredient = (arr, term) => {
  const result = []
  for (let i = 0; i < arr.length; i++) {
    const recipe = arr[i];
    if (recipe.hasOwnProperty('ingredients')) {
      const ingredients = arr[i].ingredients
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

export const search_by_ustensil = (arr, term) => {
  const result = []
  for (let i = 0; i < arr.length; i++) {
    const recipe = arr[i];
    if (recipe.hasOwnProperty('ustensils')) {
      if (recipe.ustensils.includes(term)) {
        result.push(recipe)
      }
    }
  }
  return result
}

export const search_by_appliance = (arr, term) => {
  const result = []
  for (let i = 0; i < arr.length; i++) {
    const recipe = arr[i];
    if (recipe.hasOwnProperty('appliance')) {
      if (recipe.appliance.toLowerCase().includes(term)) {
        result.push(recipe)
      }
    }
  }
  return result
}
