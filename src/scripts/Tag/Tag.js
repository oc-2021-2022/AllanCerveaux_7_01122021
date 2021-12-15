import { recipes } from '../../resources/data/recipes.json';
import { Manipulator } from '../lib/Manipulator';

export class Tag {
  constructor(type) {
    this.type = type
    const manipulator = new Manipulator() 
    const $ = (elm) => manipulator.selector(elm)

    $(`#datalist-${type}`).html(this.optionList().map(ingredient => /* html */`<option class="${this.type}" value="${ingredient}">`).join(''))
  }

  optionList() {
    if (this.type === 'ingredient') {
      const ingredients = recipes
        .map(({ ingredients }) => ingredients)
        .flat()
        .map(({ ingredient }) => ingredient)
      return ingredients.filter((ingredient, index) => ingredients.indexOf(ingredient) === index)
    }
    else if (this.type === 'appliance') {
      const appliances = recipes
        .map(({ appliance }) => appliance)
      
      return appliances.filter((appliance, index) => appliances.indexOf(appliance) === index)
    }
    else if (this.type === 'ustensil') {
      const ustensils = recipes
        .map(({ ustensils }) => ustensils)
        .flat()
        .map(ustensil => ustensil)
      
      return ustensils.filter((ustensil, index) => ustensils.indexOf(ustensil) === index)
    }
  }
  
  add (name) {
    if (this.type === 'ingredient') $('#tag-list').append(TagTemplate(name, 'primary'))
    else if (this.type === 'appliance') $('#tag-list').append(TagTemplate(name, 'green'))
    else if (this.type === 'ustensil') $('#tag-list').append(TagTemplate(name, 'orange'))
    $('#tag-list .badge.close .fa-times')
      .on('click', ({ target }) => this.remove($(target).parent().parent()))
  }
  
  remove(elm) {
    elm.remove()
  }

  selectTag() {
    let value = ''
    $(`input-${this.type}`)
      .on('input', ({ target }) => {
        value = target.data
        this.add(value)
      })
    return value
  }
}
