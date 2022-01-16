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
let isTypingTimeout = null
recipes.forEach(recipe => $('#recipe-list').append(CardTemplate(recipe)))

$('#search_term')
  .value('')
  .on('input', ({ target }) => {
    clearTimeout(isTypingTimeout)
    
    isTypingTimeout = setTimeout(() => {
      if (!target.value && !!tagList.map(({terms}) => terms).flat().length) {
        let newResult = recipes
        tagList.forEach(({ type, terms }) => {
          newResult = search.searchByTag(type, newResult, terms)
        })
        result = newResult
      }
      else if (result.length) {
        let newResult = search.searchByterm(target.value, result)
        result = newResult
      } else {
        let newResult = search.searchByterm(target.value)
        result = newResult
      }
      
      updateRender(result)
      
      if (search.error.value) {
        search.error.alert.display($('main'))
      }
    }, 100);
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

    target.value = ''
    
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
            tag.terms = tag.terms.filter((_, index) => tag.terms.indexOf(parent.text().trim()) !== index)
          }
          if (tag.terms.length > 0) {
            result = search.searchByTag(tag.type, recipes, tag.terms)
          }
        })
        if (tagList.map(({ terms }) => terms).flat().length < 1) {
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
