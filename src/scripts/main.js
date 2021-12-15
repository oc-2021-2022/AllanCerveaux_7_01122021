import { recipes } from '../resources/data/recipes.json';
import { CardTemplate } from '../templates';
import { Manipulator } from './lib/Manipulator';
import { Search } from './Search';
import { Tag } from './Tag/Tag';

let result = []
const search = new Search('functional')
const manipulator = new Manipulator() 
const $ = (elm) => manipulator.selector(elm)
const recipe_list = $('#recipe-list')

recipes.forEach(recipe => recipe_list.append(CardTemplate(recipe)))

$('#search_term')
  .value('')
  .on('input', ({ target }) => {
    result = search.searchByterm(target.value)
    updateRender(result)
    if (search.error.value) {
      search.error.alert.display($('main'))
    }
  })
  
const updateRender = (result = []) => {
  const result_id = result.map(({ id }) => id.toString())
  $('.recipe').each(recipe => {
    if (search.error) recipe.style.display = 'none'
    if (!result_id.includes($(recipe).getAttribute('data-id'))) {
      recipe.style.display = 'none'
    } else {
      recipe.style.display = 'block'
    }
  })
}

const ingredientTag = new Tag('ingredient')
const ustensilTag = new Tag('ustensil')
const applianceTag = new Tag('appliance')

ingredientTag.selectTag()
ustensilTag.selectTag()
applianceTag.selectTag()
