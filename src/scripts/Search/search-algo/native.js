import { recipes } from '../../../resources/data/recipes.json';

export const search_by_name = (term) => {
  const result = []
  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    if (recipe.hasOwnProperty('name')) {
      if (recipe.name.charAt(0).toLocaleLowerCase() === term.charAt(0)) {
        if (recipe.name.toLocaleLowerCase().includes(term)) {
          result.push(recipe)
        }
      }
    }
  }
  return result
}
