import { recipes } from '../resources/data/recipes.json';
import { inputTag } from './component/datalist';
import { generateTag, toggleItem } from './component/tag/generate-tag';
import { Manipulator } from './lib/Manipulator';
import { Search } from './Search';
import { CardTemplate, TagTemplate } from './templates';

const search = new Search('native')
const manipulator = new Manipulator() 
const $ = (elm) => manipulator.selector(elm)

generateTag(['ingredient', 'ustensil', 'appliance'])

let result = []
let tagList = []

recipes.forEach(recipe => $('#recipe-list').append(CardTemplate(recipe)))

$('#search_term')
  .value('')
  .on('input', ({ target }) => {
    if (!target.value && !!tagList.map(({ terms }) => terms).flat().length) {
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
  .each(input => inputTag.resetInput(input))
  .on('blur', inputTag.blur)
  .on('focus', inputTag.focus)
  .on('input', inputTag.input)

$('.item')
  .on('click', ({ target }) => {
    const type = target.classList.value.split(' ').pop()
    const value = target.innerText

    $('#tag-list').append(TagTemplate(value, type))
    
    if (tagList.length) {
      tagList.forEach((tag) => {
        if (tag.type === type) {
          tag.terms.push(value)
        } else {
          tagList.push({
            type,
            terms: [value]
          })
        }
      })
    } else {
      tagList.push({
        type,
        terms: [value]
      })
    }
    
    tagList.forEach((tag) => {
      if (tag.terms.length) {
        if (result.length) {
          result = search.searchByTag(tag.type, result, tag.terms)
        } else {
          result = search.searchByTag(tag.type, recipes, tag.terms)
        }
        updateRender(result)
      }
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
  })

const updateRender = (result = [], timeout = 0) => {
  toggleItem(result)
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
