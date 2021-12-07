import data from '../resources/data/recipes.json';
import { CardTemplate } from './CardTemplate';
import { Manipulator } from './lib/Manipulator';
import { search_by_name } from './Search/functional'

const manipulator = new Manipulator() 
const $ = (elm) => manipulator.selector(elm)

const recipe_list = $('#recipe-list')

data.recipes.forEach(recipe => recipe_list.append(CardTemplate(recipe)))

$('#search_term').on('keydown', ({ target }) => {
  const result = search_by_name(target.value)
  if(result.length < 1) return error()
  updateRender(result)
})

const updateRender = (result) => {
  result.forEach(recipe => recipe_list.append(CardTemplate(recipe)))
}

const error = () => $('#recipe-list').html(/* html */`
      <h2>Aucune recette ne correspond à votre critère... vous pouvez chercher « tarte aux pommes », « poisson », etc...</h2>
    `)
