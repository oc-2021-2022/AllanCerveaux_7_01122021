import { recipes } from '../../../resources/data/recipes.json'

export const search_by_name = (term) => recipes.filter(({ name }) => {
  if (name.charAt(0).toLocaleLowerCase() === term.charAt(0)) {
    return name.toLowerCase().includes(term)
  }
})
