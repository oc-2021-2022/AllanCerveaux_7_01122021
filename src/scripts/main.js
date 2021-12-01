import { Manipulator } from './lib/Manipulator';
import data from '../resources/data/recipes.json'
import {CardGenerator} from './CardGenerator'

const manipulator = new Manipulator() 
const $ = (elm) => manipulator.selector(elm)

const recipe_list = $('#recipe-list')

data.recipes.forEach(recipe => {
  console.log(recipe)
  const recipe_card = CardGenerator.render(recipe)
  recipe_list.append(recipe_card)
})
