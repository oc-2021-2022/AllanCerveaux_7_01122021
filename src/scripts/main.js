import { recipes } from '../resources/data/recipes.json';
import { Manipulator } from './lib/Manipulator';
import { Search } from './Search';
import { generateTag } from './Tag/';
import { CardTemplate, TagTemplate } from './templates';


const search = new Search('functional')
const manipulator = new Manipulator() 
const $ = (elm) => manipulator.selector(elm)

generateTag(['ingredient', 'ustensil', 'appliance'])

let result = []
let tagList = []

recipes.forEach(recipe => $('#recipe-list').append(CardTemplate(recipe)))

$('#search_term')
  .value('')
  .on('input', ({ target }) => {
    if (!target.value && tagList.length) {
      tagList.forEach(({ type, terms }) => {
        result = search.searchByTag(type, recipes, terms)
      })
    } else {
      if (result.length) {
        result = search.searchByterm(target.value, result)
      }
      else {
        result = search.searchByterm(target.value)
      }
    }
    updateRender(result, 200)
    
    if (search.error.value) {
      search.error.alert.display($('main'))
    }
  })
  

$('.input-tag')
  .on('input', ({ target, inputType, data }) => {
    if (inputType === 'insertReplacementText') {
      const type = target.id.split('-').pop()

      $('#tag-list').append(TagTemplate(data, type))
      target.value = ''

      if (tagList.length) {
        tagList.forEach((tag) => {
          if (tag.type === type) {
            tag.terms.push(data)
          } else {
            tagList.push({
              type,
              terms: [data]
            })
          }
        })
      } else {
        tagList.push({
          type,
          terms: [data]
        })
      }

      tagList.forEach(({ type, terms }) => {
        if (result.length) {
          result = search.searchByTag(type, result, terms)
        } else {
          result = search.searchByTag(type, recipes, terms)
        }
        updateRender(result)
      })

      $('.close')
        .on('click', ({ target }) => {
          const parent = $(target).parent().parent()
          parent.remove()

          tagList.forEach((tag) => {
            if (tag.type === parent.getAttribute('data-type')) {
              tag.terms = tag.terms.filter((term, index) => tag.terms.indexOf(parent.element.innerText.trim()) !== index)
            }
            if (tag.terms.length > 0) {
              result = search.searchByTag(tag.type, recipes, tag.terms)
            }
            console.log('remove tag', result)
          })
          if (!tagList.map(({ terms }) => terms).flat().length) {
            if($('#search_term').element.value) result = search.searchByterm($('#search_term').element.value)
            else result = recipes
          }

          if (document.getElementById('tag-list') === null) {
            const tagListElm = document.createElement('section')
            tagListElm.id = 'tag-list'
            tagListElm.classList.add('tags', 'mb-2', 'mt-2')
            $('#form-search').after(tagListElm)
          }
          
          updateRender(result)
        })
    }
  })

const updateRender = (result = [], timeout = 0) => {
  generateTag(['ingredient', 'ustensil', 'appliance'], result)
  setTimeout(() => {  
    const result_id = result.map(({ id }) => id.toString())
    $('.recipe').each(recipe => {
      if (search.error) recipe.style.display = 'none'
      if (!result_id.includes($(recipe).getAttribute('data-id'))) {
        recipe.style.display = 'none'
      } else {
        recipe.style.display = 'block'
      }
    })
  }, timeout);
}
