import { recipes } from '../../resources/data/recipes.json'
import { Alert } from '../Alert'
import * as functional from './search-algo/functional'
import * as native from './search-algo/native'

export class Search {
  constructor(mode) {
    this.search_service = null
    this.error = {
      value: false,
      alert: null
    }
    if (mode === 'functional') {
      this.search_service = functional
    } else if(mode === 'native') {
      this.search_service = native
    }
  }

  searchByterm(term, arr = []) {
    let alert
    let result = []
    const searched_array = arr.length ? arr : recipes

    if (!term.length) result = recipes

    result.push(
      ...this.search_service.search_by_name(searched_array, term),
      ...this.search_service.search_by_ingredient(searched_array, term),
      ...this.search_service.search_by_ustensil(searched_array, term),
      ...this.search_service.search_by_appliance(searched_array, term)
    )
    if (result.length < 1) {
      alert = new Alert('warning', 'Aucune recette ne correspond à votre critère... vous pouvez chercher « tarte aux pommes », « poisson », etc...')
      this.error = {
        value: true,
        alert
      }
    } else {
      if(this.error.value) Alert.remove()
      this.error = {
        value: false,
        alert: null
      }
    }

    return result 
  }

  searchByTag(type, arr, terms) {
    if (type === 'ingredient' && terms.length) return this.search_service.search_by_ingredient(arr, terms)
    else if (type === 'appliance' && terms.length) return this.search_service.search_by_appliance(arr, terms)
    else if (type === 'ustensil' && terms.length) return this.search_service.search_by_ustensil(arr, terms)
  }
}
