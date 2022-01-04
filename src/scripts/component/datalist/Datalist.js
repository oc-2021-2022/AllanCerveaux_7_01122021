import { Manipulator } from '../../lib/Manipulator';

const manipulator = new Manipulator() 
const $ = (elm) => manipulator.selector(elm)

export function open(target) {
  $(target).parent().parent().addClass('custom-datalist-open')
  $(`#datalist-${target.id.split('input-').pop()}`).removeClass('datalist-close')
}

export function close(target) {
  $(target).parent().parent().removeClass('custom-datalist-open')
  $(`#datalist-${target.id.split('input-').pop()}`).addClass('datalist-close')
}
