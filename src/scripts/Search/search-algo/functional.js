import { recipes } from '../../../resources/data/recipes.json'
import { first_letter_checker } from '../../lib/helpers/first_letter_checker'

export const search_by_name = (term) => recipes.filter(({ name }) => {
  if (first_letter_checker(name, term)) {
    return name.toLowerCase().includes(term)
  }
})


export const search_by_ingredient = (term) => recipes
  .filter(({ingredients}) => {
    const result = ingredients.filter(({ ingredient }) => {
      if (first_letter_checker(ingredient, term)) {
        return ingredient.toLowerCase().includes(term)
      }
    })
    return ingredients.includes(...result)
  })
