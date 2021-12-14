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

  searchByterm(term) {
    let alert
    let result = []
    if (!term.length) result = recipes
    result.push(
      ...this.search_service.search_by_name(term),
      ...this.search_service.search_by_ingredient(term),
      ...this.search_service.search_by_ustensil(term),
      ...this.search_service.search_by_appliance(term)
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
}
