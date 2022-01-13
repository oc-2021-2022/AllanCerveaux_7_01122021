import { datalist } from '.';
import { Manipulator } from '../../lib/Manipulator';

const manipulator = new Manipulator() 
const $ = (elm) => manipulator.selector(elm)

let datalist_focused = null

export function blur({target}) {
  setTimeout(() => {
    datalist.close(target)
  }, 200);
}

export function focus({target}) {
  if (datalist_focused !== target.id && datalist_focused !== null) {
    datalist.close($(`#${datalist_focused}`).element)
  }
  datalist_focused = target.id
  datalist.open(target)
}

export function input({target}) {
  const type = target.id.split('-').pop()
  const items = $(`#datalist-${type}>.item`)  
  items.each(item => {
    if (!item.innerText.toLowerCase().includes(target.value)) {
      item.style.display = 'none'
    } else {
      item.style.display = 'block'
    }
  })
}

export function resetInput (target) {
  target.value = ''
}

