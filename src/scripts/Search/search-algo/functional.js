import { recipes } from '../../../resources/data/recipes.json'

export const search_by_name = (term) => recipes.filter(({ name }) => name.toLowerCase().includes(term.toLowerCase()))


export const search_by_ingredient = (term) => recipes.filter(({ ingredients }) => {
  const result = ingredients.filter(({ ingredient }) => ingredient.toLowerCase().includes(term.toLowerCase()))
  if (result.length) {
    return ingredients.includes(...result)
  }
})

export const search_by_ustensil = (term) => recipes.filter(({ ustensils }) => ustensils.includes(term))

export const search_by_appliance = (term) => recipes.filter(({ appliance }) => appliance.toLowerCase().includes(term))
